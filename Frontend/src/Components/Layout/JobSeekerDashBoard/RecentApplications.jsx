import React, { useState } from 'react';
import { FaTrash, FaSpinner } from 'react-icons/fa';
import formatTimeAgo from '../../../utils/formatDate';

const RecentApplications = ({ recentApplications, onWithdraw }) => {
    const [withdrawing, setWithdrawing] = useState(null);

    const handleWithdrawClick = async (applicationId) => {
        const confirmed = window.confirm('Are you sure you want to withdraw this application?');
        if (!confirmed) return;
        try {
            setWithdrawing(applicationId);
            await onWithdraw(applicationId);
        } catch (error) {
            console.error('Withdraw failed:', error);
        } finally {
            setWithdrawing(null);
        }
    };

    // Get color for status badge
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'applied':
                return 'bg-blue-100 text-blue-800';
            case 'under review':
                return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted':
                return 'bg-purple-100 text-purple-800';
            case 'withdrawn':
                return 'bg-gray-100 text-gray-800';
            case 'selected':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const canWithdraw = (status) => {
        const statusLower = status?.toLowerCase();
        return statusLower !== 'withdrawn' && statusLower !== 'Selected';
    };

    // Empty state
    if (!recentApplications || recentApplications.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                </div>
                <div className="p-6 text-center text-gray-500">
                    No applications yet. Start applying to jobs!
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {recentApplications.map((application) => {
                        const appId = application._id || application.id;
                        const isWithdrawing = withdrawing === appId;
                        const canBeWithdrawn = canWithdraw(application.status);
                        const date = formatTimeAgo(application.createdAt);

                        return (
                            <div key={appId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                {/* Left side - Job info */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {application.jobInfo?.jobTitle || application.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {application.jobInfo?.company?.name || application.company}
                                    </p>
                                </div>

                                {/* Right side - Status and withdraw button */}
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                            {application.status || 'Applied'}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {date || new Date(application.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Withdraw button - show only if can be withdrawn */}
                                    {canBeWithdrawn && onWithdraw ? (
                                        <button
                                            onClick={() => handleWithdrawClick(appId)}
                                            disabled={isWithdrawing}
                                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                                                isWithdrawing
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                                            }`}
                                        >
                                            {isWithdrawing ? (
                                                <>
                                                    <FaSpinner className="h-4 w-4 animate-spin" />
                                                    <span>Withdrawing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaTrash className="h-4 w-4" />
                                                    <span>Withdraw</span>
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="px-3 py-2 text-xs text-gray-400">
                                            {application.status?.toLowerCase() === 'withdrawn' && 'Already Withdrawn'}
                                            {application.status?.toLowerCase() === 'selected' && '✓ Selected'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecentApplications;