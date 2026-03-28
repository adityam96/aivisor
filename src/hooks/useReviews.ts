import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI } from '../api';

// Hook for fetching reviews by tool ID
export const useReviews = (toolId: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['reviews', toolId, params],
    queryFn: () => reviewsAPI.getReviewsByToolId(toolId, params).then(res => res.data),
    enabled: !!toolId,
  });
};

// Hook for creating a review
export const useCreateReview = (toolId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewData: {
      rating: number;
      title: string;
      content: string;
      pros: string[];
      cons: string[];
      useCase: string;
    }) => reviewsAPI.createReview(toolId, reviewData).then(res => res.data),
    onSuccess: () => {
      // Invalidate and refetch reviews for this tool
      queryClient.invalidateQueries({ queryKey: ['reviews', toolId] });
      
      // Also update the tool details as rating might have changed
      queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
    },
  });
};

// Hook for updating a review
export const useUpdateReview = (reviewId: string, toolId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewData: any) => reviewsAPI.updateReview(reviewId, reviewData).then(res => res.data),
    onSuccess: () => {
      // Invalidate and refetch reviews for this tool
      queryClient.invalidateQueries({ queryKey: ['reviews', toolId] });
      
      // Also update the tool details as rating might have changed
      queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
    },
  });
};

// Hook for deleting a review
export const useDeleteReview = (reviewId: string, toolId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => reviewsAPI.deleteReview(reviewId).then(res => res.data),
    onSuccess: () => {
      // Invalidate and refetch reviews for this tool
      queryClient.invalidateQueries({ queryKey: ['reviews', toolId] });
      
      // Also update the tool details as rating might have changed
      queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
    },
  });
};
