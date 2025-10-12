/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, Paper, List, ListItem, Grid, TextField, 
    FormControl, InputLabel, Select, MenuItem, useMediaQuery, useTheme 
} from '@mui/material';
import { 
    Dashboard as ActivityIcon, AddCircle as PlusCircleIcon, Description as FileTextIcon, 
    Calculate as CalculatorIcon, AttachMoney as DollarSignIcon, Help as HelpCircleIcon, 
    Public as GlobeIcon, Work as BriefcaseIcon, School as SchoolIcon, 
    AccountCircle as UserIcon, CalendarToday as CalendarIcon, LocationOn as MapPinIcon, 
    Phone as PhoneIcon, Mail as MailIcon, Apartment as UniversityIcon, 
    AccessTime as ClockIcon, CheckCircle, CloudUpload as UploadIcon, 
    ArrowForward as ArrowRightIcon, ArrowBack as ArrowLeftIcon, Cancel as XCircleIcon, 
    Storage as GridIcon, Menu as MenuIcon, ExitToApp as LogOutIcon, Message as MessageSquareIcon 
} from '@mui/icons-material';


// --- Helper Data Structures ---

// Data for navigation and main content rendering
const dashboardData = {
    status: {
        title: 'Application Status',
        properties: [
            {
                title: 'Real-time Status Tracking',
                content: () => (
                    <Box>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                            Current Status: <Box component="span" fontWeight="bold">Under Review</Box>
                            {/* Stylish pulsing badge */}
                            <Box component="span" ml={1} px={1.5} py={0.5} fontSize="0.75rem" fontWeight="600" borderRadius={1} bgcolor="error.light" color="error.dark" sx={{ animation: 'pulse 1.5s infinite', border: '1px solid', borderColor: 'error.main', display: 'inline-block', lineHeight: 'normal' }}>
                                Verification in Progress
                            </Box>
                        </Typography>
                        {/* Progress Bar Enhancement */}
                        <Box sx={{ width: '100%', bgcolor: 'grey.300', borderRadius: 1, height: 16, mt: 1.5, mb: 1.5, overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: 'primary.main', height: 16, width: '75%', textAlign: 'right', color: 'white', fontSize: '0.75rem', fontWeight: '600', pr: 1, transition: 'width 0.6s' }}>
                                75% Complete
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Last Activity: Documents submitted and verified on 2025-10-09.
                        </Typography>
                    </Box>
                ),
                citation: 'Real-time tracking provided by our integrated system.'
            },
            {
                title: 'Next Steps & Deadlines',
                content: () => (
                    <List disablePadding sx={{ '& li': { py: 0.5, borderBottom: '1px dotted', borderColor: 'grey.200' }, '& li:last-child': { borderBottom: 'none' } }}>
                        <ListItem disableGutters sx={{ color: 'error.main', py: 0.75 }}>
                            <XCircleIcon sx={{ mr: 1.5, color: 'error.main' }} /> <Box component="span" fontWeight="bold">Pending:</Box> Co-Applicant Income Proof.
                        </ListItem>
                        <ListItem disableGutters sx={{ color: 'primary.main', py: 0.75 }}>
                            <CalendarIcon sx={{ mr: 1.5, color: 'error.dark' }} /> Deadline: <Box component="span" fontWeight="bold" color="error.dark" ml={0.5}>October 25, 2025</Box>.
                        </ListItem>
                        <ListItem disableGutters sx={{ color: 'success.main', py: 0.75 }}>
                            <UniversityIcon sx={{ mr: 1.5, color: 'success.main' }} /> Awaiting official confirmation from University.
                        </ListItem>
                    </List>
                ),
                citation: 'View your pending tasks to move the application forward.'
            }
        ]
    },
    apply: {
        title: 'New Application Schemes',
        properties: [
            {
                title: 'Loan Scheme Selector',
                content: ({ onStartApplication }) => (
                    <Box sx={{ '& > div': { mb: 2 } }}>
                        <Typography sx={{ mb: 2, color: 'text.secondary' }}>Choose the loan product that best suits your educational needs:</Typography>
                        <LoanTypeItem icon={GlobeIcon} title="Overseas Education Loan" desc="Covers tuition, travel, and accommodation for studies abroad. Max ₹1.5 Cr." loanId="overseas" onStartApplication={onStartApplication} iconColor="primary.main" />
                        <LoanTypeItem icon={BriefcaseIcon} title="Skill Development Loan" desc="For vocational and professional certificate courses in India. Max ₹4 Lakh." loanId="skill" onStartApplication={onStartApplication} iconColor="success.main" />
                        <LoanTypeItem icon={SchoolIcon} title="Premier Institute Scholar Loan" desc="For admission to top-tier national institutes (IIT, IIM). Collateral-free up to ₹50 Lakh." loanId="premier" onStartApplication={onStartApplication} iconColor="warning.main" />
                    </Box>
                ),
                citation: 'Select a scheme to begin the loan application process.'
            }
        ]
    },
    forms: {
        title: 'Forms & Documents',
        properties: [
            {
                title: 'Application Form Progress',
                content: () => (
                    <Box>
                        <Typography>Your Loan Application is <Box component="span" fontWeight="bold">80% Complete</Box>.</Typography>
                        <Button variant="contained" color="success" sx={{ mt: 2, boxShadow: 6, fontWeight: 'bold' }} startIcon={<ArrowRightIcon />}>
                            Resume Application
                        </Button>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Progress is automatically saved every 60 seconds.
                        </Typography>
                    </Box>
                ),
                citation: 'Dynamic forms allow you to save and continue easily.'
            },
            {
                title: 'Document Upload Status',
                content: () => (
                    <List disablePadding sx={{ '& li': { py: 0.5, borderBottom: '1px dotted', borderColor: 'grey.200' }, '& li:last-child': { borderBottom: 'none' } }}>
                        <ListItem disableGutters sx={{ color: 'success.main' }}>
                            <CheckCircle sx={{ mr: 1.5 }} /> Academic Records <Box component="span" ml={1} px={1.5} py={0.5} fontSize="0.75rem" fontWeight="600" borderRadius={1} bgcolor="success.light" color="success.dark">Verified</Box>
                        </ListItem>
                        <ListItem disableGutters sx={{ color: 'success.main' }}>
                            <CheckCircle sx={{ mr: 1.5 }} /> Student KYC <Box component="span" ml={1} px={1.5} py={0.5} fontSize="0.75rem" fontWeight="600" borderRadius={1} bgcolor="success.light" color="success.dark">Verified</Box>
                        </ListItem>
                        <ListItem disableGutters sx={{ color: 'warning.main' }}>
                            <ClockIcon sx={{ mr: 1.5 }} /> Admission Proof <Box component="span" ml={1} px={1.5} py={0.5} fontSize="0.75rem" fontWeight="600" borderRadius={1} bgcolor="warning.light" color="warning.dark">Pending</Box>
                        </ListItem>
                    </List>
                ),
                citation: 'Securely upload and track document verification.'
            }
        ]
    },
    finance: {
        title: 'Financial Tools',
        properties: [
            {
                title: 'EMI Calculator',
                content: () => (
                    <Box>
                        <Typography>Loan Amount: <Box component="span" fontWeight="bold">₹25,00,000</Box></Typography>
                        <Typography>Interest Rate (Floating): <Box component="span" fontWeight="bold">9.5% p.a.</Box></Typography>
                        <Typography>Tenure: <Box component="span" fontWeight="bold">15 Years</Box></Typography>
                        <Box sx={{ mt: 2, pt: 1.5, borderTop: '2px solid', borderColor: 'primary.main', bgcolor: 'primary.main', p: 1.5, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight="extrabold" color="white">
                                Estimated Monthly EMI: ₹25,976
                            </Typography>
                        </Box>
                    </Box>
                ),
                citation: 'Tool to estimate your Equated Monthly Installment.'
            },
            {
                title: 'Loan Eligibility Details',
                content: () => (
                    <List disablePadding sx={{ '& li': { py: 0.5 } }}>
                        <ListItem disableGutters>
                            <GridIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Max Eligible Loan: <Box component="span" fontWeight="bold" ml={0.5}>₹50,00,000</Box>
                        </ListItem>
                        <ListItem disableGutters>
                            <CalculatorIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Margin Money: <Box component="span" fontWeight="bold" ml={0.5}>0% on premium institutes</Box>
                        </ListItem>
                        <ListItem disableGutters>
                            <FileTextIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Covers: Tuition, Hostel, Books, Travel, Insurance.
                        </ListItem>
                    </List>
                ),
                citation: 'Review the maximum loan amount and eligible expenses.'
            }
        ]
    },
    disbursement: {
        title: 'Disbursement & Repayment',
        properties: [
            {
                title: 'Disbursement Schedule',
                content: () => (
                    <Box>
                        <Typography>First disbursement is scheduled after final document verification.</Typography>
                        <Box sx={{ mt: 1.5, p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                            <CalendarIcon sx={{ mr: 1.5 }} />
                            <Box component="span" fontWeight="bold">Expected Date:</Box> November 15, 2025
                        </Box>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Amount: ₹12,50,000 (Sent directly to University A/C).
                        </Typography>
                    </Box>
                ),
                citation: 'Track the schedule and amount of funds being released.'
            }
            ,
            {
                title: 'Repayment & Moratorium',
                content: () => (
                    <Box>
                        <Typography>Repayment Period: Up to 15 years post-moratorium.</Typography>
                        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed', borderColor: 'grey.400', color: 'text.secondary', p: 1.5, bgcolor: 'success.light', borderRadius: 1 }}>
                            <DollarSignIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'success.dark' }} /> 
                            <Box component="span" fontWeight="bold" color="success.dark">Tax Benefit:</Box> Interest paid is eligible for deduction under Section 80E.
                        </Box>
                        <Button variant="text" size="small" sx={{ mt: 1, fontWeight: 'bold' }}>
                            View Repayment Options
                        </Button>
                    </Box>
                ),
                citation: 'Understand your repayment tenure and tax benefits.'
            }
        ]
    },
    help: {
        title: 'Help & Support',
        properties: [
            {
                title: 'Frequently Asked Questions (FAQs)',
                content: () => (
                    <Box>
                        <Typography>Search our comprehensive knowledge base for quick answers to common questions about eligibility and loan terms.</Typography>
                        <Button variant="outlined" color="primary" sx={{ mt: 2, fontWeight: 'bold' }} startIcon={<HelpCircleIcon />}>
                            Browse FAQs
                        </Button>
                    </Box>
                ),
                citation: 'Self-service support for immediate answers.'
            },
            {
                title: 'Direct Support',
                content: () => (
                    <Box>
                        <Typography fontWeight="bold">Need personalized assistance? Open a new support ticket.</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <MailIcon sx={{ mr: 1, color: 'primary.main' }} /> support@loanportal.com
                        </Typography>
                        <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} /> +91-1234567890
                        </Typography>
                    </Box>
                ),
                citation: 'Contact the support team via email or phone.'
            }
        ]
    }
};

// Application form data structure
const loanRequirements = {
    // ... (The loanRequirements data structure remains exactly the same as the previous file)
    overseas: {
        name: 'Overseas Education Loan',
        requirements: [
            'Applicant details (Name, DOB, Address, Contact)',
            'Identity documents (Aadhaar, PAN, Passport)',
            'Educational documents (Admission Letter, Marks)',
            'Financial details (Income, Co-borrower, Bank Statements)',
            'Specific Loan details (Amount requested, Repayment plan)',
            'Collateral documents (if applicable)',
        ],
        fields: {
            personal: [
                { label: 'Full Legal Name', type: 'text', required: true, icon: UserIcon },
                { label: 'Date of Birth', type: 'date', required: true, icon: CalendarIcon },
                { label: 'Permanent Address', type: 'text', required: true, icon: MapPinIcon },
                { label: 'Phone Number', type: 'tel', required: true, icon: PhoneIcon },
                { label: 'Email Address', type: 'email', required: true, icon: MailIcon },
            ],
            education: [
                { label: 'University/College Name', type: 'text', required: true, icon: UniversityIcon },
                { label: 'Course Name (e.g., MS in CS)', type: 'text', required: true, icon: FileTextIcon },
                { label: 'Course Duration (Years)', type: 'text', required: true, icon: ClockIcon },
            ],
            financial: [
                { label: 'Applicant Annual Income', type: 'text', required: false, placeholder: 'e.g., ₹5,00,000 (Optional)', icon: DollarSignIcon },
                { label: 'Co-Borrower Full Name', type: 'text', required: true, icon: UserIcon },
                { label: 'Co-Borrower Annual Income', type: 'text', required: true, placeholder: 'e.g., ₹12,00,000', icon: DollarSignIcon },
            ],
            loan: [
                { label: 'Desired Loan Amount (INR)', type: 'text', required: true, placeholder: 'e.g., ₹45,00,000', icon: DollarSignIcon },
                { label: 'Primary Loan Purpose', type: 'text', required: true, placeholder: 'Tuition fees, living costs, etc.', icon: MessageSquareIcon },
                { label: 'Proposed Repayment Plan', type: 'select', options: ['Full Moratorium', 'Partial Interest', 'Immediate EMI'], required: true, icon: ClockIcon },
            ],
            narrative: [
                { label: 'Reason for Loan (Statement of Need)', type: 'textarea', required: true, placeholder: 'Please explain why you need the loan and how you plan to use the funds (max 500 words).', rows: 5, fullWidth: true, icon: MessageSquareIcon },
            ],
            documents: [
                { label: 'Aadhaar Card / PAN Card', type: 'file', icon: UploadIcon },
                { label: 'Passport & Visa Copy', type: 'file', icon: UploadIcon },
                { label: 'Confirmed Admission Letter (I-20/CAS)', type: 'file', icon: UploadIcon },
                { label: 'Academic Mark Sheets (Final Degree/Transcripts)', type: 'file', icon: UploadIcon },
                { label: 'Co-Borrower Income Proof (Last 3 Months)', type: 'file', icon: UploadIcon },
                { label: 'Bank Statements (Last 6 Months)', type: 'file', icon: UploadIcon },
                { label: 'Collateral Documents (if applicable)', type: 'file', required: false, icon: UploadIcon },
            ]
        }
    },
    skill: { 
        name: 'Skill Development Loan', 
        requirements: ['Applicant details', 'Identity docs', 'Educational info', 'Loan details'], 
        fields: { 
            personal: [
                { label: 'Full Legal Name', type: 'text', required: true, icon: UserIcon },
                { label: 'Date of Birth', type: 'date', required: true, icon: CalendarIcon },
                { label: 'Email Address', type: 'email', required: true, icon: MailIcon },
            ], 
            education: [
                { label: 'Training Institute Name', type: 'text', required: true, icon: UniversityIcon },
                { label: 'Course Name', type: 'text', required: true, icon: FileTextIcon },
                { label: 'Course Duration (Months)', type: 'text', required: true, icon: ClockIcon },
            ], 
            financial: [], 
            loan: [
                { label: 'Desired Loan Amount (INR)', type: 'text', required: true, placeholder: 'e.g., ₹3,50,000', icon: DollarSignIcon },
                { label: 'Primary Loan Purpose', type: 'text', required: true, placeholder: 'Tuition fees only', icon: MessageSquareIcon },
            ], 
            narrative: [
                { label: 'Reason for Loan (Statement of Need)', type: 'textarea', required: true, placeholder: 'Please explain why you need the loan (max 500 words).', rows: 5, fullWidth: true, icon: MessageSquareIcon },
            ], 
            documents: [
                { label: 'Aadhaar Card / PAN Card', type: 'file', icon: UploadIcon },
                { label: 'Enrollment Confirmation Letter', type: 'file', icon: UploadIcon },
                { label: 'Proof of Last Qualification (10th/12th certificate)', type: 'file', icon: UploadIcon },
            ] 
        } 
    },
    premier: { 
        name: 'Premier Institute Scholar Loan', 
        requirements: ['Applicant details', 'Identity docs', 'Admission Letter', 'Co-borrower', 'Loan details'], 
        fields: { 
            personal: [
                { label: 'Full Legal Name', type: 'text', required: true, icon: UserIcon },
                { label: 'Permanent Address', type: 'text', required: true, icon: MapPinIcon },
                { label: 'Phone Number', type: 'tel', required: true, icon: PhoneIcon },
            ], 
            education: [
                { label: 'Institute Name (must be premier list)', type: 'text', required: true, icon: UniversityIcon, value: 'IIT Delhi (Example)' },
                { label: 'Course Name (e.g., B.Tech)', type: 'text', required: true, icon: FileTextIcon },
            ], 
            financial: [
                { label: 'Co-Borrower Full Name (Parent/Guardian)', type: 'text', required: true, icon: UserIcon },
                { label: 'Co-Borrower Annual Income', type: 'text', required: true, placeholder: 'e.g., ₹15,00,000', icon: DollarSignIcon },
            ], 
            loan: [
                { label: 'Desired Loan Amount (INR)', type: 'text', required: true, placeholder: 'e.g., ₹50,00,000', icon: DollarSignIcon },
                { label: 'Primary Loan Purpose', type: 'text', required: true, placeholder: 'Tuition fees, hostel, living', icon: MessageSquareIcon },
            ], 
            narrative: [
                { label: 'Reason for Loan (Statement of Need)', type: 'textarea', required: true, placeholder: 'Please explain why you need the loan and how you plan to use the funds (max 500 words).', rows: 5, fullWidth: true, icon: MessageSquareIcon },
            ], 
            documents: [
                { label: 'Aadhaar Card / PAN Card', type: 'file', icon: UploadIcon },
                { label: 'Final Admission Confirmation Letter', type: 'file', icon: UploadIcon },
                { label: 'Entrance Exam Rank/Score Card', type: 'file', icon: UploadIcon },
                { label: 'Co-Borrower KYC and Income Proof', type: 'file', icon: UploadIcon },
            ]
        }
    }
};


// --- React Components ---

const NavBarItem = ({ icon: Icon, title, isSelected, onClick, featureKey }) => (
    <ListItem 
        button
        onClick={() => onClick(featureKey)}
        sx={{
            // Styling to match the image precisely
            py: 1.2, // Slightly reduced padding for compactness
            px: 3,
            mx: 2,
            my: 1, // Increased vertical margin for spacing
            borderRadius: 1, // Less aggressive rounding
            fontWeight: isSelected ? '700' : '600', // Bolder selected text
            color: isSelected ? '#1A237E' : 'grey.300', // Darker text color when selected
            bgcolor: isSelected ? 'white' : 'transparent', // White background for selected item
            boxShadow: isSelected ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
            transition: 'all 0.2s ease-out',
            '&:hover': {
                bgcolor: isSelected ? 'white' : '#2C387E', // Slightly lighter dark hover
                color: isSelected ? '#1A237E' : 'white',
            }
        }}
    >
        {/* Icon color adjusted to match the image: orange when selected, light gray otherwise */}
        <Icon sx={{ mr: 2, color: isSelected ? 'warning.main' : 'grey.400' }} />
        <Typography variant="body1" component="span" fontWeight="inherit">{title}</Typography>
    </ListItem>
);

const LoanTypeItem = ({ icon: Icon, title, desc, loanId, onStartApplication, iconColor }) => (
    <Paper 
        elevation={4} // Slightly raised for better separation
        sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 3, 
            mb: 2, 
            borderRadius: 2, 
            borderLeft: `5px solid ${iconColor}`,
            transition: 'all 0.3s ease-in-out',
            bgcolor: 'white', // Ensure white background
            '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-2px)'
            }
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
            <Icon sx={{ mr: 2, color: iconColor, fontSize: 32, flexShrink: 0 }} />
            <Box>
                <Typography variant="h6" color="text.primary" fontWeight="bold">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{desc}</Typography>
            </Box>
        </Box>
        <Button 
            variant="contained" 
            color="success" 
            size="medium"
            onClick={() => onStartApplication(loanId)}
            sx={{ ml: 2, boxShadow: 4, fontWeight: 'bold' }}
        >
            Start Application
        </Button>
    </Paper>
);

const PropertyCard = ({ title, content, citation, id, children }) => (
    <Paper 
        id={id} 
        elevation={6} // Reduced elevation for main content cards to look less bulky
        sx={{ 
            p: 4, // Padding maintained
            borderRadius: 2, // Rounded corners maintained
            transition: 'box-shadow 0.3s',
            bgcolor: 'white', // Ensure white background for cards
            '&:hover': { boxShadow: 12 }, // Subtle hover
            gridColumn: id === 'application-details-card' ? '1 / -1' : 'auto',
            minWidth: 300 
        }}
    >
        {children}
        <Typography variant="h5" color="text.primary" fontWeight="extrabold" pb={1.5} mb={2} borderBottom={1} borderColor="grey.200">
            {title}
        </Typography>
        <Box>
            {typeof content === 'function' ? content({ onStartApplication: window.showLoanDetails }) : content}
        </Box>
        <Typography variant="caption" color="text.disabled" fontStyle="italic" pt={1.5} mt={1} borderTop={1} borderColor="grey.100">
            {citation}
        </Typography>
    </Paper>
);

const FormGroup = ({ field, formState, handleChange }) => {
    const isRequired = field.required !== false;
    const Icon = field.icon;
    const inputId = field.label.replace(/\s/g, '');

    let inputElement;

    const commonProps = {
        id: inputId,
        name: inputId,
        required: isRequired,
        fullWidth: true,
        margin: "normal",
        size: "small",
        variant: "outlined", // Use outlined variant for modern look
        onChange: handleChange,
        value: formState[inputId] || '',
        InputProps: {
            startAdornment: Icon && <Icon sx={{ mr: 1, color: field.type === 'file' ? 'success.main' : 'primary.main' }} />
        },
        sx: { bgcolor: 'white' } // Ensure input background is white
    };

    if (field.type === 'select' && field.options) {
        inputElement = (
            <FormControl required={isRequired} fullWidth margin="normal" size="small">
                <InputLabel id={`${inputId}-label`}>{field.label}</InputLabel>
                <Select
                    labelId={`${inputId}-label`}
                    label={field.label}
                    {...commonProps}
                >
                    {field.options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
            </FormControl>
        );
    } else if (field.type === 'textarea') {
        inputElement = (
            <TextField
                label={field.label}
                multiline
                rows={field.rows || 3}
                placeholder={field.placeholder || ''}
                {...commonProps}
                helperText={<Typography variant="caption" color="text.secondary">Max 500 characters. Please write clearly in English.</Typography>}
                InputProps={{
                    startAdornment: <Icon sx={{ mr: 1, color: 'warning.main', alignSelf: 'flex-start', mt: 1 }} />
                }}
            />
        );
    } else if (field.type === 'file') {
        inputElement = (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" component="label" htmlFor={inputId} fontWeight="bold" display="flex" alignItems="center" color="text.secondary" mb={0.5}>
                    <UploadIcon sx={{ mr: 1, color: 'success.main' }} /> {field.label} {isRequired && <Box component="span" color="error.main">*</Box>}
                </Typography>
                <Button variant="contained" component="label" fullWidth color="success" sx={{ py: 1.5, fontWeight: 'bold' }}>
                    {formState[inputId] ? formState[inputId] : 'Choose File (PDF, JPG, PNG)'}
                    <input 
                        type="file" 
                        id={inputId} 
                        name={inputId}
                        accept=".pdf, .jpg, .png" 
                        required={isRequired} 
                        hidden
                        onChange={handleChange}
                    />
                </Button>
            </Box>
        );
    } else {
        inputElement = (
            <TextField
                label={field.label}
                type={field.type}
                placeholder={field.placeholder || ''}
                {...commonProps}
            />
        );
    }

    return (
        <Grid item xs={12} sm={field.fullWidth ? 12 : 6} sx={{ p: 1 }}>
            <Paper elevation={2} sx={{ p: 2, border: '1px solid', borderColor: 'grey.100', bgcolor: 'white' }}>
                {inputElement}
            </Paper>
        </Grid>
    );
};

// --- Full Page Components ---

const ApplicationRequirements = ({ loanId, onProceed, onBack }) => {
    const req = loanRequirements[loanId];
    if (!req) return null;

    return (
        <PropertyCard title={`${req.name} - Application Requirements`} citation="Review the requirements carefully to ensure a smooth application process." id="application-details-card">
            <Button variant="outlined" onClick={onBack} startIcon={<ArrowLeftIcon />} sx={{ mb: 3, fontWeight: 'bold' }}>
                Go Back
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="primary.main" fontWeight="extrabold" mb={2} display="flex" alignItems="center"><CheckCircle sx={{ mr: 1 }} /> Required Application Details (Summary)</Typography>
                    <List dense>
                        {req.requirements.map((detail, index) => <ListItem key={index} sx={{ py: 0.5 }}>{detail}</ListItem>)}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="primary.main" fontWeight="extrabold" mb={2} display="flex" alignItems="center"><FileTextIcon sx={{ mr: 1 }} /> Document Submission Checklist</Typography>
                    <List dense>
                        {req.fields.documents.map((doc, index) => <ListItem key={index} sx={{ py: 0.5 }}>{doc.label} ({doc.required === false ? 'Optional' : 'Mandatory'})</ListItem>)}
                    </List>
                </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={() => onProceed(loanId)}
                    startIcon={<ArrowRightIcon />}
                    sx={{ boxShadow: 8, fontWeight: 'extrabold', fontSize: '1.1rem', '&:hover': { transform: 'scale(1.03)' } }}
                >
                    Proceed to Submission Form
                </Button>
            </Box>
        </PropertyCard>
    );
};

const SubmissionForm = ({ loanId, onGoBack, onSubmit }) => {
    const req = loanRequirements[loanId];
    if (!req) return null;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formState, setFormState] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (e.target.type === 'file') {
            setFormState(prev => ({ ...prev, [name]: files[0] ? files[0].name : null }));
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLocalSubmit = (e) => {
        e.preventDefault();
        
        const form = e.target;
        if (!form.checkValidity()) {
             return;
        }

        onSubmit(e);
    };

    const renderFormSection = (title, fields) => (
        <Box component="section" sx={{ mb: 4, border: '1px solid', borderColor: 'primary.light', borderRadius: 2, p: 3, bgcolor: '#E3F2FD' }}> {/* Light Blue background for sections */}
            <Typography variant="h6" color="text.primary" fontWeight="bold" mt={1} mb={2} pb={1} borderBottom={1} borderColor="primary.main" display="flex" alignItems="center">
                {title}
            </Typography>
            <Grid container spacing={1}>
                {fields.map((field, index) => (
                    <FormGroup 
                        key={index} 
                        field={field} 
                        formState={formState}
                        handleChange={handleChange}
                    />
                ))}
            </Grid>
        </Box>
    );

    return (
        <PropertyCard title={`${req.name} - Document Submission`} citation="All data is encrypted and handled securely. Submitting this form will begin the processing stage." id="application-details-card">
            <Box component="form" onSubmit={handleLocalSubmit} sx={{ p: 0 }}>
                <Button type="button" variant="contained" color="secondary" onClick={() => onGoBack(loanId)} startIcon={<ArrowLeftIcon />} sx={{ mb: 3, fontWeight: 'bold' }}>
                    Go Back to Requirements
                </Button>
                
                {renderFormSection(<><UserIcon /> 1. Applicant & Personal Features</>, req.fields.personal)}
                {renderFormSection(<><UniversityIcon /> 2. Educational Information</>, req.fields.education)}
                {renderFormSection(<><CalculatorIcon /> 3. Loan & Financial Details</>, [...req.fields.loan, ...req.fields.financial])}
                {renderFormSection(<><MessageSquareIcon /> 4. Reason for Loan</>, req.fields.narrative)}
                {renderFormSection(<><UploadIcon /> 5. Identity & Document Uploads</>, req.fields.documents)}

                <Box sx={{ textAlign: 'center', pt: 4, mt: 4, borderTop: '1px solid', borderColor: 'grey.300' }}>
                    <Button type="submit" variant="contained" color="success" size="large" startIcon={<UploadIcon />} sx={{ boxShadow: 10, fontWeight: 'extrabold', fontSize: '1.1rem', '&:hover': { bgcolor: 'success.dark', boxShadow: 12, transform: 'scale(1.03)' } }}>
                        Final Submission for {req.name}
                    </Button>
                </Box>
            </Box>
        </PropertyCard>
    );
};


// --- Main Application Component ---

const App = () => {
    const [selectedFeature, setSelectedFeature] = useState('status');
    const [loanFlowStage, setLoanFlowStage] = useState(0); // 0: Selector, 1: Requirements, 2: Form
    const [currentLoanId, setCurrentLoanId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const sidebarWidth = 280; 

    // Expose utility functions globally for use in dynamic components (like LoanTypeItem)
    useEffect(() => {
        window.showLoanDetails = (id) => {
            setCurrentLoanId(id);
            setLoanFlowStage(1);
        };
    }, []);

    // Handlers
    const handleNavClick = (featureKey) => {
        setSelectedFeature(featureKey);
        setIsSidebarOpen(false);
        setLoanFlowStage(featureKey === 'apply' ? 0 : 0);
        setCurrentLoanId(null);
    };

    const handleProceedToForm = (id) => {
        setCurrentLoanId(id);
        setLoanFlowStage(2);
    };

    const handleBackFromRequirements = () => {
        setLoanFlowStage(0); 
    };

    const handleBackFromForm = (id) => {
        setCurrentLoanId(id);
        setLoanFlowStage(1);
    };

    const handleFormSubmit = (e) => {
        setSubmissionMessage({
            type: 'success',
            text: `Submission initiated for ${loanRequirements[currentLoanId].name}! Our system is now processing your application. Redirecting to Status page...`
        });

        setTimeout(() => {
            setSelectedFeature('status');
            setLoanFlowStage(0);
            setCurrentLoanId(null);
            setSubmissionMessage(null);
        }, 3000);
    };

    // --- Content Rendering Logic ---
    const renderContent = () => {
        if (submissionMessage) {
            return (
                <Grid item xs={12}>
                    <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark', textAlign: 'center', boxShadow: 5 }}>
                        <CheckCircle sx={{ fontSize: 40, mb: 2 }} />
                        <Typography variant="h6" fontWeight="bold">{submissionMessage.text}</Typography>
                    </Paper>
                </Grid>
            );
        }

        if (selectedFeature === 'apply') {
            if (loanFlowStage === 1 && currentLoanId) {
                return (
                    <ApplicationRequirements 
                        loanId={currentLoanId} 
                        onProceed={handleProceedToForm}
                        onBack={handleBackFromRequirements}
                    />
                );
            }
            if (loanFlowStage === 2 && currentLoanId) {
                return (
                    <SubmissionForm 
                        loanId={currentLoanId} 
                        onGoBack={handleBackFromForm}
                        onSubmit={handleFormSubmit}
                    />
                );
            }
        }
        
        // Render standard feature content
        const featureData = dashboardData[selectedFeature];
        return featureData.properties.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
                <PropertyCard 
                    title={item.title} 
                    content={item.content} 
                    citation={item.citation}
                />
            </Grid>
        ));
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh', 
            bgcolor: 'grey.50', 
            fontFamily: 'Roboto, sans-serif',
            '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.5 },
                '100%': { opacity: 1 },
            }
        }}>
            
            {/* Hamburger Menu Toggle for Mobile */}
            {isMobile && (
                <Button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    variant="contained" 
                    color="primary"
                    sx={{ position: 'fixed', top: 16, left: 16, zIndex: 101, borderRadius: '50%', minWidth: 48, p: 1, boxShadow: 6 }}
                >
                    <MenuIcon />
                </Button>
            )}

            {/* Sidebar (Navigation) */}
            <Box
                component="nav"
                sx={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    transition: (theme) => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: isMobile && !isSidebarOpen ? `-${sidebarWidth}px` : 0,
                    ...(isMobile && {
                        position: 'fixed',
                        height: '100%',
                        zIndex: 100,
                    }),
                }}
            >
                <Paper 
                    elevation={15} // Increased elevation
                    sx={{
                        width: sidebarWidth,
                        height: '100%',
                        bgcolor: '#1A237E', // Deep Indigo color
                        color: 'white',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h4" fontWeight="extrabold" color="warning.light" mb={4}>Loan Portal</Typography>
                    </Box>
                    <List disablePadding>
                        <NavBarItem icon={ActivityIcon} title="Application Status" isSelected={selectedFeature === 'status'} onClick={handleNavClick} featureKey="status" />
                        <NavBarItem icon={PlusCircleIcon} title="Apply for New Loan" isSelected={selectedFeature === 'apply'} onClick={handleNavClick} featureKey="apply" />
                        <NavBarItem icon={FileTextIcon} title="Forms & Documents" isSelected={selectedFeature === 'forms'} onClick={handleNavClick} featureKey="forms" />
                        <NavBarItem icon={CalculatorIcon} title="Financial Tools" isSelected={selectedFeature === 'finance'} onClick={handleNavClick} featureKey="finance" />
                        <NavBarItem icon={DollarSignIcon} title="Disbursement & Repayment" isSelected={selectedFeature === 'disbursement'} onClick={handleNavClick} featureKey="disbursement" />
                        <NavBarItem icon={HelpCircleIcon} title="Help & Support" isSelected={selectedFeature === 'help'} onClick={handleNavClick} featureKey="help" />
                    </List>
                    <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid', borderColor: 'grey.700' }}>
                        <Button fullWidth onClick={() => { console.log("Logging out..."); }} startIcon={<LogOutIcon />} sx={{ color: 'grey.400', '&:hover': { color: 'error.light', bgcolor: '#2C387E' }, justifyContent: 'flex-start' }}>
                            Log Out
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Main Content Area */}
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    ml: isMobile ? 0 : `${sidebarWidth}px`, 
                    p: isMobile ? 3 : 6, // INCREASED PADDING
                    transition: (theme) => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                {/* Header */}
                <Paper elevation={4} sx={{ p: 4, borderRadius: 2, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                    <Box>
                        <Typography variant="h4" fontWeight="extrabold" color="text.primary">Welcome Back, Student!</Typography>
                        <Typography variant="body1" color="text.secondary" mt={0.5} fontWeight="medium">Manage your education loan application and track your progress.</Typography>
                    </Box>
                    <UserIcon sx={{ fontSize: 48, color: 'primary.main', border: '2px solid', borderColor: 'primary.main', borderRadius: '50%', p: 0.5 }} />
                </Paper>

                {/* Properties Display Grid */}
                <Grid container spacing={6}> {/* INCREASED SPACING */}
                    {renderContent()}
                </Grid>
            </Box>
            
            {/* Overlay for mobile view */}
            {isMobile && isSidebarOpen && <Box onClick={() => setIsSidebarOpen(false)} sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.5)', zIndex: 99 }} />}
        </Box>
    );
};

export default App;
