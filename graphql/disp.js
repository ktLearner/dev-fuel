import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { interpolateGreens } from 'd3-scale-chromatic';

const QUERY = gql`
  query GetUser {
  user(login: "abernix") {
    login
    name
    avatarUrl
    bio
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
      nodes {
        name
        description
        stargazerCount
        forkCount
        updatedAt
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
      }
    }
  }
}
  }
`;

const Disp = () => {

  const { data,loading, error } = useQuery(QUERY);

    if (loading) {
      return ("....");
    }

  if (error) {
    console.error(error);
    return null;
  }
  if (data) {
    console.log(data);

    const user = data.user;
    const contributionData = data.user.contributionsCollection.contributionCalendar;

    const colorScale = (contributionCount) => {
      return (interpolateGreens(contributionCount / 50)); // Adjust the scale as needed
    };

    return (
      <div className="github-stats bg-white rounded-lg shadow-md p-4">
        <div className="user-details mb-4">
          <h2 className="text-2xl mb-2">User Details</h2>
          <div className="header text-center mb-4">
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full display-flex" />
            <h1 className="text-2xl mt-2">{user.name}</h1>
            <p className="text-gray-600 text-lg mt-2">{user.bio}</p>
          </div>
        </div>

        <div className="most-recent-repos mb-4">
          <h2 className="text-2xl mb-2">Most Recent Repositories</h2>
          <ul className="list-none p-0">
            {user.repositories.nodes.map((repo) => (
              <li key={repo.name} className="my-2">
                <strong>{repo.name}</strong> - {repo.description}
                <p className="text-gray-600 text-lg">
                  Stargazers: {repo.stargazerCount}, Forks: {repo.forkCount}
                </p>
                <p className="text-gray-600 text-lg">
                  Last Updated: {new Date(repo.updatedAt).toDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="commit-history mb-4">
          <h2 className="text-2xl mb-2">Commit History</h2>
          {/* Add your commit history component or content here */}
        </div>

        <div className="heatmaps-or-graphs">
          <h2 className="text-2xl mb-2">Heatmaps or Graphs</h2>
          {/* Add your heatmaps or graphs component or content here */}
          <div className="heatmap">
            <h2>GitHub Contribution Heatmap</h2>
            <div className="heatmap-container">
              {contributionData.weeks.map((week, weekIndex) => (
                <div className="heatmap-week" key={weekIndex}>
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      className="heatmap-day"
                      key={dayIndex}
                      style={{ backgroundColor: colorScale(day.contributionCount) }}
                    >
                      {day.contributionCount}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function ContributionHeatmap() {
  // ...
  const contributionData = data.user.contributionsCollection.contributionCalendar;

  return (
    <div className="heatmap">
      <h2>GitHub Contribution Heatmap</h2>
      <div className="heatmap-container">
        {contributionData.weeks.map((week, weekIndex) => (
          <div className="heatmap-week" key={weekIndex}>
            {week.contributionDays.map((day, dayIndex) => (
              <div
                className={`heatmap-day ${day.contributionCount === 0 ? 'inactive' : ''
                  }`}
                key={dayIndex}
              >
                {day.contributionCount}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Disp;