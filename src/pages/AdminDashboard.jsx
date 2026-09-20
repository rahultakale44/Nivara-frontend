import { useEffect, useState } from "react";
import {
  RefreshCw,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MessageSquareText,
  Image,
  Download,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import AppShell from "../components/layout/AppShell";
import { PageContainer, PageHeader, PageContent } from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Textarea, Select } from "../components/ui/Input";
import { StatusBadge, PriorityBadge } from "../components/ui/Badge";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import api from "../api/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [adminNotes, setAdminNotes] = useState({});

  const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444"];

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleString();
  };

  const getTicketNo = (id) => {
    return `CC-2026-${String(id).padStart(4, "0")}`;
  };

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await api.get("/complaints");

      setComplaints(response.data);

      const notesMap = {};
      response.data.forEach((complaint) => {
        notesMap[complaint.id] = complaint.adminNote || "";
      });

      setAdminNotes(notesMap);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Admin access required!");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const updateComplaint = async (id, status) => {
    try {
      await api.put(`/complaints/${id}/status`, {
        status,
        adminNote: adminNotes[id] || "",
      });

      toast.success("Complaint updated successfully!");
      fetchComplaints();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update complaint!");
    }
  };

  const handleNoteChange = (id, value) => {
    setAdminNotes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const exportCSV = () => {
    if (complaints.length === 0) {
      toast.error("No complaints to export!");
      return;
    }

    const headers = [
      "Ticket No",
      "Title",
      "Description",
      "Category",
      "Priority",
      "Location",
      "Status",
      "Student Name",
      "Student Email",
      "Admin Note",
      "Image URL",
      "Created At",
    ];

    const rows = complaints.map((c) => [
      getTicketNo(c.id),
      c.title || "",
      c.description || "",
      c.category || "",
      c.priority || "MEDIUM",
      c.location?.displayName || "",
      c.status || "",
      c.reporterName || "",
      c.reporterEmail || "",
      c.adminNote || "",
      c.imageUrl || "",
      formatDate(c.createdAt),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) =>
          row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "campuscare_complaints_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV report downloaded!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const inProgress = complaints.filter((c) => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const rejected = complaints.filter((c) => c.status === "REJECTED").length;

  const statusData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
    { name: "Rejected", value: rejected },
  ].filter((item) => item.value > 0);

  const categoryData = Object.values(
    complaints.reduce((acc, item) => {
      const category = item.category || "Other";
      acc[category] = acc[category] || { category, count: 0 };
      acc[category].count += 1;
      return acc;
    }, {})
  );

  const filteredComplaints = complaints.filter((complaint) => {
    const title = complaint.title || "";
    const description = complaint.description || "";
    const category = complaint.category || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell role="ADMIN">
      <PageContainer>
        <PageHeader
          title="Issue Management"
          description="Monitor and manage campus infrastructure issues"
          action={
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button
                variant="outline"
                icon={<RefreshCw size={16} />}
                onClick={fetchComplaints}
                size="sm"
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                icon={<Download size={16} />}
                onClick={exportCSV}
                size="sm"
              >
                Export CSV
              </Button>
              <Button
                variant="ghost"
                icon={<LogOut size={16} />}
                onClick={logout}
                size="sm"
              >
                Logout
              </Button>
            </div>
          }
        />

        {loading ? (
          <Loading message="Loading issues..." />
        ) : (
          <PageContent>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-brand-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ClipboardList size={24} color="var(--color-brand-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {total}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      Total Issues
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-status-pending-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock size={24} color="#B45309" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {pending}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      Pending
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-status-in-progress-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AlertCircle size={24} color="#1E40AF" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {inProgress}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      In Progress
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-status-resolved-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={24} color="#047857" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {resolved}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      Resolved
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-status-rejected-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <XCircle size={24} color="#B91C1C" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {rejected}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      Rejected
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <Card variant="outlined" padding="lg">
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
                  Status Distribution
                </h3>
                {statusData.length === 0 ? (
                  <EmptyState title="No data available" description="No status data to display" />
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90} label>
                        {statusData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Card>

              <Card variant="outlined" padding="lg">
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
                  Issues by Category
                </h3>
                {categoryData.length === 0 ? (
                  <EmptyState title="No data available" description="No category data to display" />
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                      <XAxis dataKey="category" stroke="var(--color-text-muted)" style={{ fontSize: 'var(--font-size-sm)' }} />
                      <YAxis stroke="var(--color-text-muted)" style={{ fontSize: 'var(--font-size-sm)' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="var(--color-brand-primary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Card>
            </div>

            {/* Filters */}
            <Card variant="outlined" padding="default" style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-4)', alignItems: 'end' }}>
                <Input
                  type="text"
                  placeholder="Search by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </Select>
              </div>
            </Card>

            {/* Issues List */}
            {filteredComplaints.length === 0 ? (
              <EmptyState
                title="No issues found"
                description={
                  searchTerm || statusFilter !== "ALL"
                    ? "Try adjusting your search or filter"
                    : "No issues have been reported yet"
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {filteredComplaints.map((complaint) => (
                  <Card key={complaint.id} variant="outlined" padding="lg">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-8)' }}>
                      {/* Issue Info */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
                          <h3 style={{ 
                            fontSize: 'var(--font-size-xl)', 
                            fontWeight: 'var(--font-weight-semibold)', 
                            margin: 0 
                          }}>
                            {complaint.title}
                          </h3>
                          <StatusBadge status={complaint.status} />
                        </div>

                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 'var(--space-4)', 
                          flexWrap: 'wrap',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-muted)',
                          marginBottom: 'var(--space-3)'
                        }}>
                          <span>{getTicketNo(complaint.id)}</span>
                          <span>•</span>
                          <span>{formatDate(complaint.createdAt)}</span>
                          {complaint.priority && (
                            <>
                              <span>•</span>
                              <PriorityBadge priority={complaint.priority} />
                            </>
                          )}
                        </div>

                        <p style={{ 
                          fontSize: 'var(--font-size-base)', 
                          color: 'var(--color-text-secondary)', 
                          marginBottom: 'var(--space-3)',
                          lineHeight: 'var(--line-height-relaxed)'
                        }}>
                          {complaint.description}
                        </p>

                        <div style={{ 
                          display: 'inline-block',
                          padding: 'var(--space-1) var(--space-3)',
                          backgroundColor: 'var(--color-bg-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-secondary)',
                          marginBottom: 'var(--space-3)'
                        }}>
                          {complaint.category}
                        </div>

                        {complaint.location && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--space-2)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                            marginBottom: 'var(--space-3)'
                          }}>
                            <MapPin size={14} />
                            <span>{complaint.location.displayName}</span>
                          </div>
                        )}

                        <div style={{ 
                          fontSize: 'var(--font-size-sm)', 
                          color: 'var(--color-text-muted)',
                          marginBottom: 'var(--space-3)'
                        }}>
                          Raised by: <strong>{complaint.reporterName || "Unknown"}</strong> | {complaint.reporterEmail || "No email"}
                        </div>

                        {complaint.imageUrl && (
                          <div style={{ marginTop: 'var(--space-4)' }}>
                            <a
                              href={complaint.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                color: 'var(--color-brand-primary)',
                                textDecoration: 'none',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                marginBottom: 'var(--space-3)'
                              }}
                            >
                              <Image size={16} /> View Proof Image
                            </a>
                            <img
                              src={complaint.imageUrl}
                              alt="Issue Proof"
                              style={{
                                width: '100%',
                                maxWidth: '400px',
                                borderRadius: 'var(--radius-base)',
                                border: '1px solid var(--color-border-default)'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        {complaint.adminNote && (
                          <div style={{
                            display: 'flex',
                            gap: 'var(--space-3)',
                            padding: 'var(--space-4)',
                            backgroundColor: 'var(--color-info-bg)',
                            border: '1px solid var(--color-info-border)',
                            borderRadius: 'var(--radius-base)',
                            marginTop: 'var(--space-4)'
                          }}>
                            <MessageSquareText size={18} color="var(--color-info)" style={{ flexShrink: 0 }} />
                            <p style={{ 
                              fontSize: 'var(--font-size-sm)', 
                              color: 'var(--color-text-secondary)',
                              margin: 0
                            }}>
                              {complaint.adminNote}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Admin Actions */}
                      <div style={{ minWidth: '280px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <Select
                          label="Update Status"
                          value={complaint.status}
                          onChange={(e) => updateComplaint(complaint.id, e.target.value)}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </Select>

                        <Textarea
                          label="Admin Note"
                          placeholder="Add note visible to student..."
                          value={adminNotes[complaint.id] || ""}
                          onChange={(e) => handleNoteChange(complaint.id, e.target.value)}
                          rows={4}
                        />

                        <Button
                          variant="primary"
                          onClick={() => updateComplaint(complaint.id, complaint.status)}
                          fullWidth
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </PageContent>
        )}
      </PageContainer>
    </AppShell>
  );
}

export default AdminDashboard;