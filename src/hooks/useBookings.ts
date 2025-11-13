import { BookingType } from "@/types";
import { getDataClient } from "@/utils/getData";
import { postData } from "@/utils/postData";
import { createMovieBookingsList } from "@/utils/utils";
import { UUID } from "crypto";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { HTTP_STATUS } from "@/utils/constaints";

interface UseBookingsProps {
  initialData: BookingType[]
  initialStatus: number
  timeLimit: number
}

export const useBookings = ({ initialData, initialStatus, timeLimit }: UseBookingsProps) => {
  let processedData = useMemo(() => createMovieBookingsList(initialData || []), [initialData]);

  const [status, setStatus] = useState(initialStatus);
  const [bookings, setBookings] = useState(processedData);
  const [processingId, setProcessingId] = useState<UUID | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { logoutUser } = useAuth();
  const router = useRouter();

  const refreshBookings = useCallback(async () => {
    const newBookings = await getDataClient("user/bookings/all", true);
    setStatus(newBookings.status);
    if (newBookings.status === HTTP_STATUS.OK) {
      setBookings(createMovieBookingsList(newBookings.data));
      setError(null);
    } else {
      setError(newBookings.message);
    }
  }, []);

  const handlePayment = useCallback(async (bookingId: UUID) => {
    setProcessingId(bookingId);
    const res = await postData(`user/bookings/set/${bookingId}/payment`);
    if (res.status === HTTP_STATUS.OK) await refreshBookings()
    else {
      if (res.status === HTTP_STATUS.UNAUTHORIZED) logoutUser().then(() => router.push('/login'))
      else setError(res.message);
    }
    setProcessingId(null);
  }, [refreshBookings]);

  const handleTimeout = useCallback(async (bookingId: UUID) => {
    setProcessingId(bookingId);
    await refreshBookings();
  }, [refreshBookings]);

  return {
    status,
    bookings,
    error,
    processingId,
    handlePayment,
    handleTimeout,
    timeLimit,
  };
}
