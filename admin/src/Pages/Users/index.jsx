import React from "react";
import {
  FcBusinessman,
  FcBusinesswoman,
  FcManager,
  FcAddressBook,
  FcStatistics,
  FcPaid,
} from "react-icons/fc";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Checkbox,
  Avatar,
  Typography,
  Select,
  MenuItem,
  Chip,
  IconButton,
  TablePagination,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdFilterList,
  MdRefresh,
  MdMoreVert,
  MdLocalPhone,
} from "react-icons/md";
import { FaUserTie, FaUserShield } from "react-icons/fa";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useState } from "react";
import { deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
import { BsTrash } from "react-icons/bs";

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [usersData, setUsersData] = useState([]);
  const [usersTotalData, setUsersTotalData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchquery, setSearchQuery] = useState("");
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      setUsersData(res?.users);
      setUsersTotalData(res?.users);
      setIsLoading(false);
    });
  };

  // search users

  useEffect(() => {
    if (searchquery !== "") {
      const filteredUsers = usersData.filter(
        (user) =>
          user?._id?.toLowerCase().includes(searchquery.toLowerCase()) ||
          user?.name.toLowerCase().includes(searchquery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchquery.toLowerCase()) ||
          user?.createdAt.toLowerCase().includes(searchquery.toLowerCase()) ||
          user?.mobile?.toString().includes(searchquery),
      );
      setUsersData(filteredUsers);
    } else {
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res.users.length === 0) {
          setUsersData(res?.users);
          setIsLoading(false);
        }
      });
    }
  }, [searchquery]);

  // 🔹 checkbox logic
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // Update all items checked status
    const updatedItems = usersData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUsersData(updatedItems);

    // Update the sorted Ids state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = usersData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item,
    );
    setUsersData(updatedItems);

    //Updated the sorted Ids state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  //Delete Multiple Product
  const deleteMultiple = async () => {
    if (sortedIds.length === 0) {
      context.alertBox("Please select items to delete", "error");
      return;
    }

    try {
      const res = await deleteMultipleData("/api/user/deleteMultiple", {
        ids: sortedIds,
      });

      if (res?.success) {
        getUsers();
        context.alertBox("Users deleted successfully", "success");
      }
    } catch (error) {
      context.alertBox("Error deleting users", "error");
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaUserTie className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            <p className="text-sm text-gray-600">Manage all registered users</p>
          </div>
        </div>

        <div className="flex gap-3">
          {sortedIds?.length !== 0 && (
            <Tooltip title="Delete Data" arrow>
              <IconButton
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "10px 16px",
                  backgroundColor: "#fee2e2",
                  "&:hover": {
                    backgroundColor: "#e0f2fe",
                    borderColor: "#0284c7",
                  },
                }}
                onClick={deleteMultiple}
              >
                <BsTrash className="text-gray-600" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <SearchBox
              searchquery={searchquery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Paper elevation={4} sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              {/* Table Header */}
              <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Checkbox
                        size="small"
                        onChange={handleSelectAll}
                        checked={
                          usersData?.length > 0
                            ? usersData.every((user) => user.checked)
                            : false
                        }
                      />
                      <b>User</b>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <b>Email</b>
                  </TableCell>

                  <TableCell>
                    <b>Phone</b>
                  </TableCell>

                  <TableCell>
                    <b>Email Verify</b>
                  </TableCell>

                  <TableCell>
                    <b>Role</b>
                  </TableCell>

                  {/* <TableCell>
                    <b>Actions</b>
                  </TableCell> */}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {isloading === false ? (
                  usersData.length !== 0 &&
                  usersData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    ?.reverse()
                    ?.map((user, index) => {
                      return (
                        <TableRow key={index} hover>
                          {/* User */}
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Checkbox
                                size="small"
                                checked={user?.checked === true ? true : false}
                                onChange={(e) =>
                                  handleCheckboxChange(e, user._id, index)
                                }
                              />

                              <Avatar
                                src={
                                  user?.avatar
                                    ? user.avatar
                                    : "/defaultUser.jpg"
                                }
                                sx={{ width: 45, height: 45 }}
                              />

                              <Box>
                                <Typography fontWeight="600">
                                  {user?.name}
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="flex"
                                  alignItems="center"
                                  gap={0.5}
                                >
                                  <FcAddressBook />
                                  Joined on{" "}
                                  {new Date(
                                    user?.createdAt,
                                  ).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Email */}
                          <TableCell>
                            <Typography>{user?.email}</Typography>
                          </TableCell>

                          {/* Phone */}
                          <TableCell>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="flex"
                              alignItems="center"
                              gap={0.5}
                            >
                              <MdLocalPhone />
                              {user?.mobile || "NO MOBILE NO"}
                            </Typography>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            {user?.verify_email ? (
                              <Chip
                                label="Verified"
                                color="success"
                                size="small"
                              />
                            ) : (
                              <Chip
                                label="Not Verified"
                                color="error"
                                size="small"
                              />
                            )}
                          </TableCell>

                          {/* Role */}
                          <TableCell>
                            {user?.role === "ADMIN" ? (
                              <Chip
                                label="Admin"
                                color="primary"
                                size="small"
                              />
                            ) : (
                              <Chip
                                label="Customer"
                                color="warning"
                                size="small"
                              />
                            )}
                          </TableCell>

                          {/* Actions */}
                          {/* <TableCell>
                            <IconButton color="primary">
                              <MdVisibility />
                            </IconButton>

                            <IconButton color="success">
                              <MdEdit />
                            </IconButton>

                            <IconButton color="error">
                              <MdDelete />
                            </IconButton>
                          </TableCell> */}
                        </TableRow>
                      );
                    })
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={8}>
                        <div className="flex items-center justify-center w-full min-h-[400px]">
                          <CircularProgress color="inherit" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={usersData?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Users;
