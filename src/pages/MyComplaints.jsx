import { useEffect, useState } from "react";
import { Search, RefreshCw, MapPin, Image, MessageSquareText } from "lucide-react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell";
import { PageContainer, PageHeader, PageContent } from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Select } from "../components/ui/Input";
import { StatusBadge, PriorityBadge } from "../components/ui/Badge";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import api from "../api/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleString();
  };

  const getTicketNo = (id) => {
    return `CC-2026-${String(id).padStart(4, "0")}`;
  };

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);

      const response = await api.get("/complaints/my");

      setComplaints(response.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to fetch complaints!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);

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
    <AppShell role="STUDENT">
      <PageContainer>
        <PageHeader
          title="My Issues"
          description="Track and monitor your submitted campus issues"
          action={
            <Button
              variant="outline"
              icon={<RefreshCw size={16} />}
              onClick={fetchMyComplaints}
              size="sm"
            >
              Refresh
            </Button>
          }
        />

        <PageContent>
          <Card variant="outlined" padding="default" style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-4)', alignItems: 'end' }}>
              <Input
                icon={<Search size={18} />}
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

          {loading ? (
            <Loading message="Loading your issues..." />
          ) : filteredComplaints.length === 0 ? (
            <EmptyState
              title="No issues found"
              description={
                searchTerm || statusFilter !== "ALL"
                  ? "Try adjusting your search or filter"
                  : "You haven't reported any issues yet"
              }
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {filteredComplaints.map((complaint) => (
                <Card key={complaint.id} variant="outlined" padding="lg">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
                        <h3 style={{ 
                          fontSize: 'var(--font-size-xl)', 
                          fontWeight: 'var(--font-weight-semibold)', 
                          margin: 0,
                          color: 'var(--color-text-primary)'
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
                            <Image size={16} /> View Uploaded Image
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
                          <div>
                            <div style={{ 
                              fontSize: 'var(--font-size-sm)', 
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--color-text-primary)',
                              marginBottom: 'var(--space-1)'
                            }}>
                              Admin Note
                            </div>
                            <p style={{ 
                              fontSize: 'var(--font-size-sm)', 
                              color: 'var(--color-text-secondary)',
                              margin: 0,
                              lineHeight: 'var(--line-height-relaxed)'
                            }}>
                              {complaint.adminNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </PageContent>
      </PageContainer>
    </AppShell>
  );
}

export default MyComplaints;