import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ImagePlus, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import AppShell from "../components/layout/AppShell";
import { PageContainer, PageHeader, PageContent } from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Textarea, Select } from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import api from "../api/api";

function CreateComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [locationId, setLocationId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const fetchLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await api.get("/locations");
      setLocations(response.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load locations!");
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const uploadImage = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("file", image);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationId) {
      toast.error("Please select a location!");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      await api.post("/complaints", {
        title,
        description,
        category,
        locationId: parseInt(locationId),
        priority,
        imageUrl,
      });

      toast.success("Complaint Submitted Successfully!");

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1000);
    } catch (error) {
      console.log(error.response?.data);
      const errorMsg = error.response?.data?.message || "Failed to Submit Complaint!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell role="STUDENT">
      <PageContainer>
        <PageHeader
          title="Create Issue"
          description="Report a new campus infrastructure issue with location details and priority"
        />

        <PageContent>
          {loadingLocations ? (
            <Loading message="Loading campus locations..." />
          ) : (
            <Card variant="elevated" padding="lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <Input
                  label="Issue Title"
                  type="text"
                  placeholder="Brief description of the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Library">Library</option>
                  <option value="Network">Network</option>
                  <option value="Other">Other</option>
                </Select>

                <Select
                  label="Location"
                  icon={<MapPin size={18} />}
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  required
                  disabled={loadingLocations}
                >
                  <option value="">Select location *</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.displayName}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Priority Level"
                  icon={<AlertTriangle size={18} />}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                  <option value="URGENT">Urgent Priority</option>
                </Select>

                <Textarea
                  label="Detailed Description"
                  placeholder="Provide detailed information about the issue"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  required
                />

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 'var(--font-size-sm)', 
                    fontWeight: 'var(--font-weight-medium)', 
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Proof Image (Optional)
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4)',
                    border: '2px dashed var(--color-border-strong)',
                    borderRadius: 'var(--radius-base)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    backgroundColor: 'var(--color-bg-subtle)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                  }}
                  >
                    <ImagePlus size={22} color="var(--color-brand-primary)" />
                    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
                      {image ? image.name : "Click to upload an image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', paddingTop: 'var(--space-4)' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<Send size={18} />}
                    disabled={loading || loadingLocations}
                    loading={loading}
                    fullWidth
                  >
                    {loading ? "Submitting..." : "Submit Issue"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/student-dashboard")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </PageContent>
      </PageContainer>
    </AppShell>
  );
}

export default CreateComplaint;