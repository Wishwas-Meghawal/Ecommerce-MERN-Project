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
  MdEdit,
  MdDelete,
  MdVisibility,
  MdFilterList,
  MdRefresh,
  MdMoreVert,
} from "react-icons/md";
import { FaUserTie, FaUserShield } from "react-icons/fa";

const Users = () => {
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
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
            <FcBusinessman className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <FcStatistics className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">VIP Users</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
            <FaUserShield className="text-2xl text-yellow-600" />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">₹5,42,560</p>
            </div>
            <FcPaid className="text-3xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <MdFilterList />
            Filter
          </button>

          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <MdRefresh />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  User
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statistics
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Row 1 */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FcBusinessman className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Rajesh Kumar
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FcAddressBook />
                        Joined 2023-12-15
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">rajesh@example.com</div>
                <div className="text-xs text-gray-500">+91 98765 43210</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-0 focus:ring-2 focus:ring-blue-500">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Customer
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">24</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">₹42,560</div>
                      <div className="text-xs text-gray-500">Spent</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FcBusinesswoman className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Priya Sharma
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FcAddressBook />
                        Joined 2023-10-22
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">priya@example.com</div>
                <div className="text-xs text-gray-500">+91 87654 32109</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-0 focus:ring-2 focus:ring-blue-500">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  VIP
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">67</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">₹1,25,800</div>
                      <div className="text-xs text-gray-500">Spent</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FcManager className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Amit Patel
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FcAddressBook />
                        Joined 2024-01-10
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">amit@example.com</div>
                <div className="text-xs text-gray-500">+91 76543 21098</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-500">
                  <option>Inactive</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Customer
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">5</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">₹8,450</div>
                      <div className="text-xs text-gray-500">Spent</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FcBusinesswoman className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Sneha Gupta
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FcAddressBook />
                        Joined 2023-08-05
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">sneha@example.com</div>
                <div className="text-xs text-gray-500">+91 65432 10987</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-0 focus:ring-2 focus:ring-blue-500">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Admin
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">89</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">₹2,34,120</div>
                      <div className="text-xs text-gray-500">Spent</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FcBusinessman className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Vikram Singh
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FcAddressBook />
                        Joined 2024-02-18
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">vikram@example.com</div>
                <div className="text-xs text-gray-500">+91 54321 09876</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border-0 focus:ring-2 focus:ring-blue-500">
                  <option>Suspended</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Customer
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">12</div>
                      <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">₹18,760</div>
                      <div className="text-xs text-gray-500">Spent</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">5</span> of{" "}
          <span className="font-semibold">8</span> users
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
