import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ListChecks,
  Sparkles,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { PageContainer, PageHeader, PageContent } from "../components/layout/PageContainer";
import Card, { CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/Badge";
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import api from "../api/api";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get("/complaints/my");
      setComplaints(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const inProgress = complaints.filter((c) => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const recentComplaints = complaints.slice(-3).reverse();
  const resolvedPercentage = total === 0 ? 0 : Math.round((resolved / total) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <AppShell role="STUDENT">
      <PageContainer>
        <PageHeader
          title="Dashboard"
          description="Track your campus issues and monitor resolution progress"
        />

        {loading ? (
          <Loading message="Loading your dashboard..." />
        ) : (
          <PageContent>
            {/* Welcome Card */}
            <Card variant="elevated" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Sparkles size={18} color="var(--color-brand-primary)" />
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-brand-primary)' }}>
                      {getGreeting()}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-semibold)', margin: '0 0 var(--space-2)' }}>
                    Your Dashboard is Ready
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                    Track your campus issues, monitor progress, and stay updated
                  </p>
                </div>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>
                    {resolvedPercentage}%
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)' }}>Resolved</div>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
              <Card variant="outlined" padding="default">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-lg)', 
                    backgroundColor: 'var(--color-brand-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ListChecks size={24} color="var(--color-brand-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
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
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={24} color="#B45309" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
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
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <AlertCircle size={24} color="#1E40AF" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
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
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckCircle2 size={24} color="#047857" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                      {resolved}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      Resolved
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
              <Card variant="outlined" padding="lg">
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', margin: '0 0 var(--space-3)' }}>
                  Report New Issue
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                  Submit a new campus infrastructure issue with location details
                </p>
                <Link to="/create-complaint">
                  <Button variant="primary" icon={<PlusCircle />} fullWidth>
                    Create Issue
                  </Button>
                </Link>
              </Card>

              <Card variant="outlined" padding="lg">
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', margin: '0 0 var(--space-3)' }}>
                  My Issues
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                  View all your submitted issues and track their status
                </p>
                <Link to="/my-complaints">
                  <Button variant="outline" icon={<ListChecks />} fullWidth>
                    View All Issues
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Recent Issues */}
            <Card variant="outlined" padding="lg">
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardTitle>Recent Issues</CardTitle>
                  <Link to="/my-complaints">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentComplaints.length === 0 ? (
                  <EmptyState
                    icon={<ListChecks size={48} />}
                    title="No issues yet"
                    description="You haven't reported any issues yet. Click 'Create Issue' to get started."
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {recentComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          padding: 'var(--space-4)',
                          border: '1px solid var(--color-border-default)',
                          borderRadius: 'var(--radius-base)',
                          gap: 'var(--space-4)',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ 
                            fontSize: 'var(--font-size-base)', 
                            fontWeight: 'var(--font-weight-semibold)', 
                            margin: '0 0 var(--space-2)',
                            color: 'var(--color-text-primary)'
                          }}>
                            {complaint.title}
                          </h4>
                          <p style={{ 
                            fontSize: 'var(--font-size-sm)', 
                            color: 'var(--color-text-secondary)', 
                            margin: '0 0 var(--space-2)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {complaint.description}
                          </p>
                          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                            {complaint.category}
                          </span>
                        </div>
                        <StatusBadge status={complaint.status} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </PageContent>
        )}
      </PageContainer>
    </AppShell>
  );
}

export default StudentDashboard;
