import React, { useState, useEffect } from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  PendingActions as PendingIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import axiosInstance from '../../utils/axios';


const categories = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
];

const statusColors = {
  pending: "warning",
  accepted: "success",
  rejected: "error"
};



const GigAdminDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");
  const [activeTab, setActiveTab] = useState("pending");
  const [isUpdating, setIsUpdating] = useState(false);

  // Add useEffect to fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        //const response = await axiosInstance.get('/admins/pending-services');
        //const response = await axiosInstance.get('/services/');
        const response = await axiosInstance.get(`/services/?${activeTab}`);
        
        // Fetch provider details for each service
        const servicesWithProviders = await Promise.all(
          response.data.map(async (service) => {
            try {
              const providerResponse = await axiosInstance.get(`/serviceProviders/${service.serviceProviderId}`);
              const provider = providerResponse.data;
              
              return {
                id: service.serviceId,
                title: service.title,
                seller: provider ? 
                  `${provider.fname || ''} ${provider.lname || ''}`.trim() : 
                  'Unknown Provider',
                category: service.category,
                price: service.basePrice,
                description: service.description,
                status: service.status,
                submittedAt: service.createdAt,
                providerId: service.serviceProviderId
              };
            } catch (error) {
              console.error(`Error fetching provider ${service.serviceProviderId}:`, error);
              return {
                ...service,
                seller: 'Unknown Provider'
              };
            }
          })
        );
  
        setGigs(servicesWithProviders);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.response?.data?.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, [setGigs, activeTab]);

  const GigRequestCard = ({ gig }) => {
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" component="h3">
                {gig.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {gig.seller}
              </Typography>
            </Box>
            <Chip
              label={gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
              color={statusColors[gig.status]}
              size="small"
            />
          </Box>
  
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1">
                {gig.category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Price
              </Typography>
              <Typography variant="body1">
                ${gig.price}/hr
              </Typography>
            </Grid>
          </Grid>
  
          <Typography variant="body2" sx={{ mb: 2 }}>
            {gig.description}
          </Typography>
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Submitted: {formatDate(gig.submittedAt)}
            </Typography>
            <Box>
              <IconButton
                color="success"
                onClick={() => handleStatusApproval(gig.id, "accepted")}
                disabled={gig.status === "accepted" || isUpdating}
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleStatusRejection(gig.id, "rejected")}
                disabled={gig.status === "rejected"}
              >
                <CancelIcon />
              </IconButton>
              <IconButton color="primary">
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const handleStatusApproval = async (serviceId, newStatus) => {
    try {
      setIsUpdating(true);
      const response = await axiosInstance.put(`/admins/approve-service/${serviceId}`);
      
      if (response.data.success) {
        //Update local state to move gig to accepted tab
        setGigs(prevGigs => 
          prevGigs.map(gig => 
            gig.serviceId === serviceId 
              ? { ...gig, status: 'accepted' } 
              : gig
          )
        );
        
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      setError(error.response?.data?.message || 'Failed to update service status');
    } finally{
      setIsUpdating(false);
    }
  };

  const handleStatusRejection = async (serviceId, newStatus) => {
    try {
      setIsUpdating(true);
      const response = await axiosInstance.put(`/admins/reject-service/${serviceId}`);
      
      if (response.data.success) {
        //Update local state to move gig to accepted tab
        setGigs(prevGigs => 
          prevGigs.map(gig => 
            gig.serviceId === serviceId 
              ? { ...gig, status: 'rejected' } 
              : gig
          )
        );
        
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      setError(error.response?.data?.message || 'Failed to update service status');
    } finally{
      setIsUpdating(false);
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter and sort gigs
  const filteredGigs = gigs
    .filter(gig => {
      const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gig.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter;
      const matchesStatus = gig.status === activeTab; // Add status filter
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (dateSort === "newest") {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      } else {
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      }
    });

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
      <Typography color="error">Error: {error}</Typography>
    </Box>
  );

  const getTabCount = (status) => gigs.filter(gig => gig.status === status).length;

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 3 }}>
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Service Approval Dashboard
        </Typography>

        {/* Search and Filter Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search services or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}

            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Date Sort</InputLabel>
              <Select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                label="Date Sort"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<PendingIcon />}
            iconPosition="start"
            label={`Pending (${getTabCount("pending")})`}
            value="pending"
            onClick={() => {
              setActiveTab("pending");
            }}
          />
          <Tab
            icon={<CheckCircleIcon />}
            iconPosition="start"
            label={`Accepted (${getTabCount("accepted")})`}
            value="accepted"
            onClick={() => {
              setActiveTab("accepted");
            }}
          />
          <Tab
            icon={<CancelIcon />}
            iconPosition="start"
            label={`Rejected (${getTabCount("rejected")})`}
            value="rejected"
            onClick={() => {
              setActiveTab("rejected");
            }}
          />
        </Tabs>

        <Box>
          {filteredGigs.length > 0 ? (
            filteredGigs.map(gig => (
              <GigRequestCard 
                key={gig.id} 
                gig={gig} 
                //onStatusChange={handleStatus}
              />
            ))
          ) : (
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ textAlign: 'center', py: 4 }}
            >
              No services found
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default GigAdminDashboard;






