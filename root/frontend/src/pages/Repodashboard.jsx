import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaArrowRight, FaFilter, FaHeart, FaChartBar, FaFileAlt, FaEdit } from 'react-icons/fa';


const Repodashboard = () => {
    const [projects, setProjects] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            setProjects(projects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hard-coded repository statistics
    const repoStatistics = {
        commits: 120,
        pullRequests: 15,
        issues: 8,
        stars: 32,
        forks: 12,
    };

    return (
        <div className="container mx-auto p-4 relative">
            <div className="flex mb-4 space-x-4 items-center">
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-1/4 px-4 py-2 border rounded-md focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="flex items-center px-4 py-2 border rounded-md bg-[#41889e] text-white hover:bg-[#357a8d] focus:outline-none"
                >
                    <FaFilter className="mr-2" />
                    Filter
                </button>
                <span className="flex items-center text-[#41889e] font-semibold">
                    {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
                </span>
            </div>

            {filteredProjects.map((project, index) => (
                <div key={project._id} className="mb-4 p-4 border rounded-md shadow-md space-y-2 bg-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">{project.projectName}</h2>
                            <p className="text-sm text-gray-600">{project.projectDetails}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="/newrepo"
                                className="flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300"
                            >
                                <span className="mr-2">Add Repository</span>
                                <FaArrowRight />
                            </a>

                            <FaHeart className="text-[#41889e] cursor-pointer" />

                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="focus:outline-none"
                                >
                                    <FaEllipsisV className="text-[#41889e]" />
                                </button>
                                {dropdownVisible === index && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                        >
                                            Delete Project
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-[#f8f9fa] rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Repository Health</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <FaChartBar className="mr-2 text-[#41889e]" />
                                <span>Commits: {repoStatistics.commits}</span>
                            </div>
                            <div className="flex items-center">
                                <FaChartBar className="mr-2 text-[#41889e]" />
                                <span>Pull Requests: {repoStatistics.pullRequests}</span>
                            </div>
                            <div className="flex items-center">
                                <FaChartBar className="mr-2 text-[#41889e]" />
                                <span>Issues: {repoStatistics.issues}</span>
                            </div>
                            <div className="flex items-center">
                                <FaChartBar className="mr-2 text-[#41889e]" />
                                <span>Stars: {repoStatistics.stars}</span>
                            </div>
                            <div className="flex items-center">
                                <FaChartBar className="mr-2 text-[#41889e]" />
                                <span>Forks: {repoStatistics.forks}</span>
                            </div>

                        </div>
                        <div className="flex flex-wrap items-center border-t border-[#41889e] mt-4 pt-2 gap-4">
    <a href="/analytics"
        className="flex-grow inline-flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300 rounded-md border-none"
    >
        <span className="mr-2">Analytics</span>
        <FaChartBar />
    </a>
    <a href="/report"
        className="flex-grow inline-flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300 rounded-md border-none"
    >
        <span className="mr-2">Report</span>
        <FaFileAlt /> {/* Report icon */}
    </a>
    <a href="/edit"
        className="flex-grow inline-flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300 rounded-md border-none"
    >
        <span className="mr-2">Edit</span>
        <FaEdit /> {/* Edit icon */}
    </a>
</div>

                    </div>
                </div>
            ))}

            <a
                href="/createrepo"
                className="fixed bottom-4 right-4 bg-[#41889e] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#357a8d] focus:outline-none flex items-center space-x-2"
            >
                <div className="text-white text-xl font-bold">+</div>
                <span>Add New Project</span>
            </a>
        </div>
    );
};

export default Repodashboard;
