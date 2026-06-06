import { useQuery } from "@tanstack/react-query";
import { fetchUserWallet } from "@/api/wallet";
import { TOKEN, USER_ID } from "@/utils/constants";

export const useWallet = () => {
  const token = localStorage.getItem(TOKEN);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : {};
  const userId = userData?.user_id;

  return useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => fetchUserWallet(Number(userId)),
    enabled: !!token && !!userId,
    staleTime: 1000 * 60 * 3, // 3 minutes
    refetchOnWindowFocus: false,
  });
};
