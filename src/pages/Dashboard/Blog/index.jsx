import React, { useEffect, useState, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import PasswordModal from "../Card/PasswordModal";
import ViewBlogModal from "./ViewBlogModal";
import CustomSuccessToast from "../../../components/CustomSuccessToast";
import CustomErrorToast from "../../../components/CustomErrorToast";
import { BASE_IMAGE_URL } from "../../../utilities/constants";
import { useDeleteBlog, useSearchBlog, useViewBlog } from "../../../Hooks/useBlog";

const Blog = ({ blogs, onAddButtonClick, onEditClick, onDeleteClick, loading }) => {
    const [rows, setRows] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [activityPin, setActivityPin] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const [viewBlogId, setViewBlogId] = useState(null);
    const [viewedBlog, setViewedBlog] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const deleteBlog = useDeleteBlog();
    const searchBlog = useSearchBlog();
    const viewBlog = useViewBlog();

    const handleEditClick = useCallback((item) => onEditClick(item), [onEditClick]);

    const handleDeleteClick = useCallback((id) => {
        setPendingDeleteId(id);
        setShowPasswordModal(true);
    }, []);

    const handleViewClick = useCallback((id) => {
        setViewBlogId(id);
        setShowPasswordModal(true);
    }, []);

    const handlePasswordSubmit = async () => {
        if (!activityPin.trim()) return;

        setPasswordLoading(true);

        if (pendingDeleteId) {
            const result = await deleteBlog(pendingDeleteId, activityPin);
            setPasswordLoading(false);
            if (result?.success || result?.error === 0) {
                CustomSuccessToast("Blog deleted successfully!");
                onDeleteClick(pendingDeleteId);
                setPendingDeleteId(null);
            } else {
                CustomErrorToast("Failed to delete blog. Please try again.");
            }
        }

        if (viewBlogId) {
            try {
                const res = await viewBlog(viewBlogId, activityPin);
                setViewedBlog(res.result);
                setShowViewModal(true);
            } catch (err) {
                console.error(err);
            } finally {
                setPasswordLoading(false);
            }
        }

        setActivityPin("");
        setShowPasswordModal(false);
    };

    const handlePasswordModalClose = () => {
        setActivityPin("");
        setPendingDeleteId(null);
        setViewBlogId(null);
        setShowPasswordModal(false);
    };

    const handleViewModalClose = () => {
        setViewedBlog(null);
        setShowViewModal(false);
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchTerm(query);

        if (!query.trim()) {
            formatRows(blogs);
            return;
        }

        try {
            const res = await searchBlog(query);
            console.log("Search successful! Results:", res);

            if (res?.result?.rows) {
                formatRows(res.result.rows);
            }
        } catch (err) {
            console.error("Search failed:", err);
        }
    };

    const formatRows = (data) => {
        const formatted = data.map((item, index) => {
            const imageSrc = item.image ? `${BASE_IMAGE_URL}${item.image}` : "";
            return {
                serial: <span className="table-text font-weight-500">{index + 1}</span>,
                title: <span className="table-text font-weight-600">{item.title || "N/A"}</span>,
                category: <span className="table-text">{item.name || "N/A"}</span>,
                content: (
                    <span className="table-text" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                        {item.content || "N/A"}
                    </span>
                ),
                status: <CustomButton type={item.status === 1 ? "green" : "red"} />,
                image: imageSrc ? (
                    <img src={imageSrc} alt={item.title} style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />
                ) : (
                    <span className="table-text">N/A</span>
                ),
                action: (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CustomButton type="edit" onClick={() => handleEditClick(item)} />
                        {deletingId === item.id ? (
                            <CircularProgress size={24} color="error" />
                        ) : (
                            <CustomButton type="delete" onClick={() => handleDeleteClick(item.id)} />
                        )}
                        <CustomButton type="view" onClick={() => handleViewClick(item.id)} />
                    </Box>
                ),
            };
        });
        setRows(formatted);
    };

    useEffect(() => {
        if (blogs && Array.isArray(blogs)) formatRows(blogs);
    }, [blogs, loading, deletingId]);

    const columns = [
        { id: "serial", label: "S/N", minWidth: 80 },
        { id: "title", label: "TITLE", minWidth: 200 },
        { id: "category", label: "CATEGORY", minWidth: 150 },
        { id: "content", label: "CONTENT", minWidth: 150 },
        { id: "status", label: "STATUS", minWidth: 120 },
        { id: "image", label: "IMAGE", minWidth: 150 },
        { id: "action", label: "ACTIONS", minWidth: 180 },
    ];

    return (
        <Box>
            <CustomTable
                columns={columns}
                rows={loading ? [{ serial: "", title: <CustomLoader /> }] : rows}
                showAddButton={true}
                addButtonTitle="Add Blog"
                addButtonStyle={{ marginTop: "40px" }}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                onAddButtonClick={onAddButtonClick}
            />

            <PasswordModal
                open={showPasswordModal}
                onClose={handlePasswordModalClose}
                onSubmit={handlePasswordSubmit}
                password={activityPin}
                setPassword={setActivityPin}
                loading={passwordLoading}
                error={null}
            />

            <ViewBlogModal open={showViewModal} onClose={handleViewModalClose} blog={viewedBlog} />
        </Box>
    );
};

Blog.propTypes = {
    blogs: PropTypes.array,
    onAddButtonClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

Blog.defaultProps = {
    blogs: [],
    loading: false,
};

export default Blog;
