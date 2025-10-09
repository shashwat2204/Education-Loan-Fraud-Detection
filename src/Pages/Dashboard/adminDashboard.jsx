import React, { useState } from 'react';
import { 
    Box, Typography, Button, Paper, List, ListItem, Grid, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    useMediaQuery, useTheme, Chip, Divider
} from '@mui/material';
import { 
    SupervisorAccount as AdminIcon, Assessment as ReportIcon, ListAlt as ListIcon, 
    CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Warning as WarningIcon, 
    ArrowForward as ArrowRightIcon, ArrowBack as ArrowLeftIcon, Message as MessageSquareIcon,
    EmojiEvents as TrophyIcon, TrendingUp as TrendingUpIcon, AssignmentInd as IdentityIcon,
    ExitToApp as LogOutIcon, MoreVert as MoreIcon, Search as SearchIcon, 
    AccessTime as ClockIcon // Added ClockIcon for document status
} from '@mui/icons-material';

// --- Configuration & Styling ---

const COLORS = {
    primaryBlue: '#2A60E4', 
    secondaryDark: '#1E293B',
    warningColor: '#FBBF24', // Yellow/Orange for warnings
    successColor: '#10B981', // Green for approval
    dangerColor: '#EF4444',   // Red for rejection/high risk
    lightGray: '#F1F5F9',
    cardWhite: '#ffffff',
    infoColor: '#2A60E4', // Blue for informational
};

const sidebarWidth = 280; 

// --- Mock Data ---

const MOCK_APPLICATIONS = [
    { id: 'APP0045', name: 'Alok Sharma', loanType: 'Overseas', risk: 85, status: 'Review Pending', date: '2025-10-09' },
    { id: 'APP0046', name: 'Priya Singh', loanType: 'Premier', risk: 32, status: 'Auto Approved', date: '2025-10-09' },
    { id: 'APP0047', name: 'Vijay Menon', loanType: 'Skill Dev', risk: 58, status: 'Under Review', date: '2025-10-08' },
    { id: 'APP0048', name: 'Smriti Rao', loanType: 'Overseas', risk: 12, status: 'Approved', date: '2025-10-07' },
    { id: 'APP0049', name: 'Karan Joshi', loanType: 'Premier', risk: 71, status: 'Review Pending', date: '2025-10-07' },
];

const getRiskColor = (risk) => {
    if (risk >= 70) return COLORS.dangerColor;
    if (risk >= 50) return COLORS.warningColor;
    return COLORS.successColor;
};

const getRiskChip = (risk) => {
    const color = getRiskColor(risk);
    return (
        <Chip 
            label={`Risk: ${risk}%`} 
            sx={{ 
                bgcolor: color, 
                color: 'white', 
                fontWeight: 'bold', 
                fontSize: '0.75rem', 
                borderRadius: '4px' 
            }}
            size="small"
        />
    );
};

// --- Helper Components ---

const NavBarItem = ({ icon: Icon, title, isSelected, onClick, featureKey }) => (
    <ListItem 
        button
        onClick={() => onClick(featureKey)}
        sx={{
            py: 1.5,
            px: 3,
            mx: 2,
            my: 1, 
            borderRadius: '12px',
            fontWeight: isSelected ? '700' : '600',
            color: isSelected ? COLORS.secondaryDark : 'grey.300', 
            bgcolor: isSelected ? COLORS.cardWhite : 'transparent', 
            boxShadow: isSelected ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
            transition: 'all 0.2s ease-out',
            '&:hover': {
                bgcolor: isSelected ? COLORS.cardWhite : '#334155',
                color: isSelected ? COLORS.secondaryDark : COLORS.cardWhite,
                transform: 'scale(1.01)',
            }
        }}
    >
        <Icon sx={{ mr: 2, color: isSelected ? COLORS.warningColor : 'grey.400' }} />
        <Typography variant="body1" component="span" fontWeight="inherit">{title}</Typography>
    </ListItem>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
    <Paper elevation={6} sx={{ p: 3, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: COLORS.cardWhite }}>
        <Box>
            <Typography variant="h6" fontWeight="bold" color="text.secondary">{title}</Typography>
            <Typography variant="h3" fontWeight="extrabold" color={color} mt={0.5}>{value}</Typography>
        </Box>
        <Icon sx={{ fontSize: 60, color: color, opacity: 0.2 }} />
    </Paper>
);

const XAIFlag = ({ icon: Icon, title, score, details, color }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: '8px', borderLeft: `4px solid ${color}`, bgcolor: COLORS.lightGray }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight="bold" color={color} display="flex" alignItems="center">
                <Icon sx={{ mr: 1 }} /> {title}
            </Typography>
            <Chip label={`Score: +${score}`} size="small" sx={{ bgcolor: color, color: COLORS.cardWhite, fontWeight: 'bold' }} />
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{details}</Typography>
    </Paper>
);

// --- Dashboard Features ---

const ApplicationListView = ({ onSelectApplication }) => (
    <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
            {/* FIX: Changed icon for clarity */}
            <StatCard title="Total Pending" value="3 / 5" icon={ListIcon} color={COLORS.dangerColor} /> 
        </Grid>
        <Grid item xs={12} md={4}>
            <StatCard title="High Risk Applications" value="2" icon={WarningIcon} color={COLORS.dangerColor} />
        </Grid>
         <Grid item xs={12} md={4}>
            <StatCard title="Avg. Risk Score" value="51%" icon={TrendingUpIcon} color={COLORS.warningColor} />
        </Grid>
        <Grid item xs={12}>
            <Paper elevation={6} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: COLORS.primaryBlue }}>
                            <TableRow>
                                {['ID', 'Applicant Name', 'Loan Type', 'Risk Score', 'Status', 'Date', 'Action'].map((head) => (
                                    <TableCell key={head} sx={{ color: COLORS.cardWhite, fontWeight: 'bold' }}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MOCK_APPLICATIONS.map((app) => (
                                <TableRow 
                                    key={app.id} 
                                    // Make the entire row clickable to select the application
                                    onClick={() => onSelectApplication(app)}
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: COLORS.lightGray, cursor: 'pointer' } 
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography component="span" fontWeight="bold" color={COLORS.primaryBlue} sx={{ textDecoration: 'underline' }}>{app.id}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Typography component="span" fontWeight="bold" color={COLORS.secondaryDark}>{app.name}</Typography>
                                    </TableCell>
                                    <TableCell>{app.loanType}</TableCell>
                                    <TableCell>{getRiskChip(app.risk)}</TableCell>
                                    <TableCell>
                                        <Chip label={app.status} size="small" sx={{ 
                                            // Conditional color for status chips
                                            bgcolor: app.status.includes('Pending') || app.status.includes('Under Review') ? COLORS.warningColor : COLORS.successColor,
                                            color: COLORS.cardWhite
                                        }} />
                                    </TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell>
                                        {/* Keep the explicit action button, but make it less prominent now that the row is clickable */}
                                        <Button 
                                            variant="text" 
                                            size="small"
                                            onClick={(e) => { e.stopPropagation(); onSelectApplication(app); }} // Use e.stopPropagation() to prevent double click
                                            sx={{ color: COLORS.primaryBlue }}
                                            endIcon={<ArrowRightIcon fontSize="small" />}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    </Grid>
);

const ApplicationDetailView = ({ application, onBackToList }) => {
    // Mock application details for the selected application
    const mockDetails = {
        applicant: { email: 'alok.sharma@example.com', phone: '+91 98765 43210', dob: '1998-05-15' },
        documents: ['Aadhaar/PAN (Verified)', 'Passport (Pending)', 'Admission Letter (Verified)'],
        loanAmount: '₹1.5 Crore',
        riskDetails: [
            { icon: TrendingUpIcon, title: 'High Geo-Location Deviation', score: 30, color: COLORS.dangerColor, details: 'Application initiated from IP in Mumbai, but historical account logins are from Pune (200km difference).' },
            { icon: IdentityIcon, title: 'Document Data Mismatch', score: 25, color: COLORS.warningColor, details: 'The DOB entered in the form (1998) slightly differs from the date read from the scanned passport (1999).' },
            { icon: MessageSquareIcon, title: 'Abnormal Typing Pattern', score: 15, color: COLORS.warningColor, details: 'Sections were completed too quickly, suggesting copy/paste or bot-assisted entry.' },
        ],
        totalRiskScore: application.risk,
    };

    return (
        <Box>
            <Button 
                onClick={onBackToList} 
                startIcon={<ArrowLeftIcon />} 
                sx={{ mb: 3, fontWeight: 'bold', bgcolor: '#64748B', color: COLORS.cardWhite, '&:hover': { bgcolor: '#4B5563' }, borderRadius: '8px' }}
            >
                Back to Application List
            </Button>

            <Typography variant="h4" fontWeight="extrabold" color={COLORS.secondaryDark} mb={3}>
                Reviewing Application: {application.id} - {application.name}
            </Typography>

            <Grid container spacing={3}>
                {/* Application Snapshot */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={6} sx={{ p: 3, borderRadius: '12px', bgcolor: COLORS.cardWhite, height: '100%' }}>
                        <Typography variant="h6" color={COLORS.infoColor} fontWeight="bold" mb={2}>Application Snapshot</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography><strong>Loan Type:</strong> {application.loanType}</Typography>
                        <Typography><strong>Amount:</strong> {mockDetails.loanAmount}</Typography>
                        <Typography><strong>DOB:</strong> {mockDetails.applicant.dob}</Typography>
                        <Typography><strong>Email:</strong> {mockDetails.applicant.email}</Typography>
                        <Typography><strong>Phone:</strong> {mockDetails.applicant.phone}</Typography>
                        
                        <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Documents Status</Typography>
                        <List dense>
                            {mockDetails.documents.map((doc, i) => (
                                <ListItem key={i} sx={{ p: 0 }}>
                                    {doc.includes('Verified') ? <CheckCircleIcon sx={{ color: COLORS.successColor, mr: 1 }} /> : <ClockIcon sx={{ color: COLORS.warningColor, mr: 1 }} />}
                                    {doc}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* AI/Fraud Risk Report */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={6} sx={{ p: 3, borderRadius: '12px', bgcolor: COLORS.cardWhite, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" mb={2} display="flex" alignItems="center">
                            <ReportIcon sx={{ mr: 1, color: COLORS.primaryBlue }} /> AI Fraud Risk Report
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ p: 2, mb: 3, borderRadius: '8px', textAlign: 'center', bgcolor: getRiskColor(mockDetails.totalRiskScore), color: COLORS.cardWhite }}>
                            <Typography variant="h3" fontWeight="extrabold">{mockDetails.totalRiskScore}%</Typography>
                            <Typography variant="body1" fontWeight="bold">Total Calculated Fraud Risk Score</Typography>
                        </Box>

                        <Typography variant="body1" fontWeight="bold" mb={2} color="text.secondary">Explainable AI (XAI) Flags:</Typography>
                        {mockDetails.riskDetails.map((flag, i) => (
                            <XAIFlag 
                                key={i} 
                                icon={flag.icon} 
                                title={flag.title} 
                                score={flag.score} 
                                details={flag.details} 
                                color={flag.color} 
                            />
                        ))}
                    </Paper>
                </Grid>
                
                {/* Action Panel */}
                <Grid item xs={12}>
                    <Paper elevation={6} sx={{ p: 4, borderRadius: '12px', bgcolor: COLORS.lightGray, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" mb={3} color={COLORS.secondaryDark}>Decision Action</Typography>
                        <Button 
                            variant="contained" 
                            size="large" 
                            startIcon={<CheckCircleIcon />}
                            sx={{ bgcolor: COLORS.successColor, '&:hover': { bgcolor: '#059669' }, mx: 1, fontWeight: 'bold' }}
                        >
                            Approve Loan
                        </Button>
                        <Button 
                            variant="contained" 
                            size="large" 
                            startIcon={<WarningIcon />}
                            sx={{ bgcolor: COLORS.warningColor, '&:hover': { bgcolor: '#D99C00' }, mx: 1, fontWeight: 'bold' }}
                        >
                            Request Step-Up Verification
                        </Button>
                        <Button 
                            variant="contained" 
                            size="large" 
                            startIcon={<CancelIcon />}
                            sx={{ bgcolor: COLORS.dangerColor, '&:hover': { bgcolor: '#C53030' }, mx: 1, fontWeight: 'bold' }}
                        >
                            Reject Application
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};


// --- Main Admin Dashboard Component ---

const AdminApp = () => {
    const [selectedFeature, setSelectedFeature] = useState('applications');
    const [selectedApplication, setSelectedApplication] = useState(null);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleNavClick = (featureKey) => {
        setSelectedFeature(featureKey);
        setSelectedApplication(null);
    };

    const renderContent = () => {
        if (selectedApplication) {
            return (
                <ApplicationDetailView 
                    application={selectedApplication} 
                    onBackToList={() => setSelectedApplication(null)}
                />
            );
        }

        switch (selectedFeature) {
            case 'applications':
                return <ApplicationListView onSelectApplication={setSelectedApplication} />;
            case 'reports':
                return <Typography variant="h5" p={3}>AI Model Performance Reports (Placeholder)</Typography>;
            case 'settings':
                return <Typography variant="h5" p={3}>System Settings & User Management (Placeholder)</Typography>;
            default:
                return <ApplicationListView onSelectApplication={setSelectedApplication} />;
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh', 
            bgcolor: COLORS.lightGray, 
            fontFamily: 'Inter, sans-serif',
        }}>
            
            {/* Sidebar (Navigation) - STICKY / FIXED */}
            <Box
                component="nav"
                sx={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    height: '100vh',
                    position: 'sticky', // Ensure sidebar stays fixed
                    top: 0,
                    overflowY: 'auto',
                    bgcolor: COLORS.secondaryDark,
                }}
            >
                <Paper 
                    elevation={15} 
                    sx={{
                        width: sidebarWidth,
                        height: '100%',
                        bgcolor: COLORS.secondaryDark,
                        color: COLORS.cardWhite,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 0,
                    }}
                >
                    <Box sx={{ p: 3, pt: 4, pb: 2 }}>
                        <Typography variant="h4" fontWeight="800" color={COLORS.warningColor} sx={{ fontSize: '1.8rem' }}>Admin Console</Typography>
                    </Box>
                    <List disablePadding sx={{ py: 1 }}>
                        <NavBarItem 
                            icon={ListIcon} 
                            title="Application Review" 
                            isSelected={selectedFeature === 'applications'} 
                            onClick={handleNavClick} 
                            featureKey="applications" 
                        />
                        <NavBarItem 
                            icon={ReportIcon} 
                            title="AI Model Reports" 
                            isSelected={selectedFeature === 'reports'} 
                            onClick={handleNavClick} 
                            featureKey="reports" 
                        />
                        <NavBarItem 
                            icon={AdminIcon} 
                            title="System Settings" 
                            isSelected={selectedFeature === 'settings'} 
                            onClick={handleNavClick} 
                            featureKey="settings" 
                        />
                    </List>
                    <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid #334155' }}>
                        <Button fullWidth onClick={() => { console.log("Logging out..."); }} startIcon={<LogOutIcon />} sx={{ color: 'grey.400', '&:hover': { color: COLORS.dangerColor, bgcolor: '#334155' }, justifyContent: 'flex-start' }}>
                            Log Out
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Main Content Area - Scrollable */}
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    width: `calc(100% - ${sidebarWidth}px)`,
                    height: '100vh', // Set height for overflow control
                    overflowY: 'auto', // Enable vertical scrolling for content
                    p: 0, // Remove main container padding
                }}
            >
                {/* Header - STICKY POSITIONED */}
                <Paper 
                    elevation={4} 
                    sx={{ 
                        p: 4, 
                        mb: 4, 
                        borderRadius: 0, // No rounding needed for sticky header
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        bgcolor: COLORS.cardWhite,
                        position: 'sticky', // Make the header sticky
                        top: 0, // Stick to the top of the scrollable container
                        zIndex: 10, // Ensure it stays above other content
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow when scrolling
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight="800" color={COLORS.secondaryDark} sx={{ fontSize: '2.2rem' }}>Loan Officer Dashboard</Typography>
                        <Typography variant="body1" color="#64748B" mt={0.5} fontWeight="600">Review flagged applications and manage AI insights.</Typography>
                    </Box>
                    <SearchIcon sx={{ fontSize: 48, color: COLORS.primaryBlue, border: '2px solid', borderColor: COLORS.primaryBlue, borderRadius: '50%', p: 0.5 }} />
                </Paper>

                {/* Content Render - Padded inside a wrapper Box */}
                <Box sx={{ p: 4 }}> 
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminApp;
