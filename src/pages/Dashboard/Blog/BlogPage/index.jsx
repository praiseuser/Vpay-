import React, { useState } from "react";
import Blog from "../index";
import { useGetBlogs } from "../../../../Hooks/useBlog";
import CreateBlogForm from "../AddBlog";

const BlogPage = () => {
    const { blogs, loading, refetch } = useGetBlogs(1);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleOpenAddForm = () => setShowAddForm(true);

    const handleCloseAddForm = () => {
        setShowAddForm(false);
        refetch();
    };

    return (
        <div>
            {showAddForm ? (
                <CreateBlogForm handleCancel={handleCloseAddForm} />
            ) : (
                <Blog
                    blogs={blogs}
                    loading={loading}
                    onAddButtonClick={handleOpenAddForm}
                    onEditClick={() => { refetch(); }}
                    onDeleteClick={() => { refetch(); }}
                />
            )}
        </div>
    );
};

export default BlogPage;
