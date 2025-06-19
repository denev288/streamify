import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { capitalize } from "../lib/utils";
import { MessageSquareIcon, VideoIcon, BookOpenIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { getLanguageFlag } from "../components/FriendCard"

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const navigate = useNavigate();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedData, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // Extract recommendedUsers from the response data
  const recommendedUsers = recommendedData?.recommendedUsers || [];

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Welcome to your language journey!
          </h1>
          <p className="opacity-70 mb-4">
            Connect with friends, discover new learners, and start practicing
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Learning Progress</div>
            <div className="stat-value text-primary">89%</div>
            <div className="stat-desc">Daily streak: 7 days</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Active Friends</div>
            <div className="stat-value text-secondary">{friends.length}</div>
            <div className="stat-desc">Online now</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Messages</div>
            <div className="stat-value">15</div>
            <div className="stat-desc">New conversations</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Practice Hours</div>
            <div className="stat-value">24h</div>
            <div className="stat-desc">Last 7 days</div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Learning Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Daily Practice</span>
                  <span className="text-primary">80%</span>
                </div>
                <progress
                  className="progress progress-primary"
                  value="80"
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Vocabulary</span>
                  <span className="text-secondary">65%</span>
                </div>
                <progress
                  className="progress progress-secondary"
                  value="65"
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Grammar</span>
                  <span className="text-accent">45%</span>
                </div>
                <progress
                  className="progress progress-accent"
                  value="45"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/friends")}
          >
            <MessageSquareIcon className="size-4 mr-2" />
            Start Chat
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/friends")}
          >
            <VideoIcon className="size-4 mr-2" />
            Video Call
          </button>
          <button
            className="btn btn-accent"
            onClick={() => navigate("/study-materials")}
          >
            <BookOpenIcon className="size-4 mr-2" />
            Study Materials
          </button>
          <button className="btn">
            <UsersIcon className="size-4 mr-2" />
            Find Partners
          </button>
        </div>

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages with flags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitalize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitalize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      {/* Action button */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
