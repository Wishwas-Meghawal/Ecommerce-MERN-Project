import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  Avatar,
  Badge
} from "@mui/material";
import { 
  FcPaid, 
  FcSettings, 
  FcSearch,
  FcOvertime,
  FcDebt,
  FcMoneyTransfer
} from "react-icons/fc";
import { 
  MdEdit, 
  MdDelete, 
  MdVisibility, 
  MdMoreVert,
  MdFilterList,
  MdLocalShipping,
  MdCheckCircle,
  MdCancel,
  MdPending
} from "react-icons/md";
import { 
  FaBox, 
  FaRupeeSign, 
  FaUser, 
  FaCreditCard,
  FaTruck,
  FaCheck
} from "react-icons/fa";

const Orders = () => {
  // Table columns
  const columns = [
    { id: "select", label: "", minWidth: 60 },
    { id: "orderId", label: "Order ID", minWidth: 140 },
    { id: "customer", label: "Customer", minWidth: 180 },
    { id: "date", label: "Date", minWidth: 120 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "payment", label: "Payment", minWidth: 130 },
    { id: "status", label: "Status", minWidth: 140 },
    { id: "actions", label: "Actions", minWidth: 150 }
  ];

  // Sample data
  const rows = [
    {
      id: 1,
      orderId: "ORD-2024-00125",
      customer: "Rajesh Kumar",
      email: "rajesh@email.com",
      date: "15 Mar 2024",
      time: "10:30 AM",
      amount: "₹5,499",
      items: 3,
      payment: "Paid",
      paymentMethod: "Credit Card",
      status: "Delivered",
      shipping: "Delivered",
      address: "Mumbai, Maharashtra"
    },
    {
      id: 2,
      orderId: "ORD-2024-00126",
      customer: "Priya Sharma",
      email: "priya@email.com",
      date: "15 Mar 2024",
      time: "11:45 AM",
      amount: "₹12,899",
      items: 5,
      payment: "Paid",
      paymentMethod: "UPI",
      status: "Processing",
      shipping: "Processing",
      address: "Delhi, NCR"
    },
    {
      id: 3,
      orderId: "ORD-2024-00127",
      customer: "Amit Patel",
      email: "amit@email.com",
      date: "14 Mar 2024",
      time: "02:15 PM",
      amount: "₹8,250",
      items: 2,
      payment: "Pending",
      paymentMethod: "COD",
      status: "Shipped",
      shipping: "In Transit",
      address: "Bangalore, Karnataka"
    },
    {
      id: 4,
      orderId: "ORD-2024-00128",
      customer: "Sneha Gupta",
      email: "sneha@email.com",
      date: "14 Mar 2024",
      time: "04:30 PM",
      amount: "₹23,499",
      items: 8,
      payment: "Paid",
      paymentMethod: "Debit Card",
      status: "Pending",
      shipping: "Pending",
      address: "Hyderabad, Telangana"
    },
    {
      id: 5,
      orderId: "ORD-2024-00129",
      customer: "Vikram Singh",
      email: "vikram@email.com",
      date: "13 Mar 2024",
      time: "09:20 AM",
      amount: "₹3,299",
      items: 1,
      payment: "Failed",
      paymentMethod: "Credit Card",
      status: "Cancelled",
      shipping: "Cancelled",
      address: "Pune, Maharashtra"
    },
    {
      id: 6,
      orderId: "ORD-2024-00130",
      customer: "Anjali Reddy",
      email: "anjali@email.com",
      date: "13 Mar 2024",
      time: "01:45 PM",
      amount: "₹15,750",
      items: 4,
      payment: "Paid",
      paymentMethod: "Wallet",
      status: "Delivered",
      shipping: "Delivered",
      address: "Chennai, Tamil Nadu"
    },
    {
      id: 7,
      orderId: "ORD-2024-00131",
      customer: "Rohit Verma",
      email: "rohit@email.com",
      date: "12 Mar 2024",
      time: "03:30 PM",
      amount: "₹6,899",
      items: 3,
      payment: "Paid",
      paymentMethod: "Net Banking",
      status: "Shipped",
      shipping: "Out for Delivery",
      address: "Kolkata, West Bengal"
    },
    {
      id: 8,
      orderId: "ORD-2024-00132",
      customer: "Neha Kapoor",
      email: "neha@email.com",
      date: "12 Mar 2024",
      time: "05:15 PM",
      amount: "₹11,299",
      items: 6,
      payment: "Paid",
      paymentMethod: "Credit Card",
      status: "Processing",
      shipping: "Processing",
      address: "Ahmedabad, Gujarat"
    }
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return { bg: '#d1fae5', text: '#065f46', icon: <FaCheck className="text-green-600" /> };
      case 'processing': return { bg: '#fef3c7', text: '#92400e', icon: <MdPending className="text-yellow-600" /> };
      case 'shipped': return { bg: '#dbeafe', text: '#1e40af', icon: <FaTruck className="text-blue-600" /> };
      case 'pending': return { bg: '#f3f4f6', text: '#374151', icon: <FcOvertime className="text-gray-600" /> };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', icon: <MdCancel className="text-red-600" /> };
      default: return { bg: '#f3f4f6', text: '#374151', icon: <MdPending /> };
    }
  };

  const getPaymentColor = (payment) => {
    switch(payment.toLowerCase()) {
      case 'paid': return { bg: '#d1fae5', text: '#065f46', icon: <FcPaid /> };
      case 'pending': return { bg: '#fef3c7', text: '#92400e', icon: <FcDebt /> };
      case 'failed': return { bg: '#fee2e2', text: '#991b1b', icon: <FcMoneyTransfer /> };
      default: return { bg: '#f3f4f6', text: '#374151', icon: <FcDebt /> };
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
            <FcPaid className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
            <p className="text-sm text-gray-600">View and manage all customer orders</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<FcSettings />}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              padding: '10px 20px',
            }}
          >
            Settings
          </Button>
          <Button
            variant="contained"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            sx={{
              borderRadius: '12px',
              padding: '10px 20px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">248</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FcPaid className="text-2xl text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">₹2,45,899</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaRupeeSign className="text-2xl text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <MdPending className="text-2xl text-purple-500" />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-800">₹9,915</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FcMoneyTransfer className="text-2xl text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextField
            fullWidth
            placeholder="Search by Order ID, Customer, Email..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FcSearch />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'white',
              }
            }}
          />
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<MdFilterList />}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              padding: '10px 20px',
            }}
          >
            Filter Orders
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              padding: '10px 20px',
            }}
          >
            Shipping
          </Button>
        </div>
      </div>

      {/* Material UI Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px', boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{
                      backgroundColor: '#f8fafc',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: '14px',
                      borderBottom: '2px solid #e5e7eb',
                      padding: column.id === "select" ? '0 16px' : '16px'
                    }}
                  >
                    {column.id === "select" ? (
                      <Checkbox
                        size="small"
                        sx={{ padding: 0 }}
                      />
                    ) : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const statusColor = getStatusColor(row.status);
                const paymentColor = getPaymentColor(row.payment);
                
                return (
                  <TableRow 
                    hover 
                    key={row.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f9fafb' }
                    }}
                  >
                    {/* Checkbox */}
                    <TableCell sx={{ padding: '0 16px' }}>
                      <Checkbox
                        size="small"
                        sx={{ padding: '12px' }}
                      />
                    </TableCell>
                    
                    {/* Order ID */}
                    <TableCell>
                      <div>
                        <div className="font-bold text-gray-900">{row.orderId}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <FaBox className="text-xs" />
                          <span>{row.items} items</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Customer */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#3b82f6' }}>
                          {row.customer.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{row.customer}</div>
                          <div className="text-xs text-gray-500">{row.email}</div>
                          <div className="text-xs text-gray-400">{row.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Date */}
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{row.date}</div>
                        <div className="text-xs text-gray-500">{row.time}</div>
                      </div>
                    </TableCell>
                    
                    {/* Amount */}
                    <TableCell>
                      <div className="font-bold text-gray-900 text-lg">{row.amount}</div>
                      <div className="text-xs text-gray-500">Total amount</div>
                    </TableCell>
                    
                    {/* Payment */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Chip
                          label={row.payment}
                          size="small"
                          icon={paymentColor.icon}
                          sx={{
                            backgroundColor: paymentColor.bg,
                            color: paymentColor.text,
                            fontWeight: 500,
                            borderRadius: '6px'
                          }}
                        />
                        <div className="text-xs text-gray-500">{row.paymentMethod}</div>
                      </div>
                    </TableCell>
                    
                    {/* Status */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Chip
                          label={row.status}
                          size="small"
                          icon={statusColor.icon}
                          sx={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                            fontWeight: 500,
                            borderRadius: '6px'
                          }}
                        />
                        <div className="text-xs text-gray-500">{row.shipping}</div>
                      </div>
                    </TableCell>
                    
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            '&:hover': { backgroundColor: '#f3f4f6' }
                          }}
                        >
                          <MdVisibility className="text-gray-600 text-sm" />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            '&:hover': { backgroundColor: '#f3f4f6' }
                          }}
                        >
                          <MdLocalShipping className="text-blue-600 text-sm" />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            '&:hover': { backgroundColor: '#fef2f2' }
                          }}
                        >
                          <MdDelete className="text-red-500 text-sm" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          sx={{
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}
        />
      </Paper>

      {/* Quick Stats Footer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">5</div>
            <div className="text-xs text-gray-600">New Today</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">18</div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">89</div>
            <div className="text-xs text-gray-600">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">3</div>
            <div className="text-xs text-gray-600">Refunds</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">2</div>
            <div className="text-xs text-gray-600">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox size="small" />
            <span className="font-medium text-blue-700">Select all orders</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' }
              }}
              startIcon={<MdLocalShipping />}
            >
              Update Shipping
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: '#10b981',
                color: '#10b981',
                '&:hover': { 
                  borderColor: '#059669',
                  backgroundColor: '#d1fae5'
                }
              }}
              startIcon={<MdCheckCircle />}
            >
              Mark as Delivered
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: '#ef4444',
                color: '#ef4444',
                '&:hover': { 
                  borderColor: '#dc2626',
                  backgroundColor: '#fef2f2'
                }
              }}
              startIcon={<MdCancel />}
            >
              Cancel Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;