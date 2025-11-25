import { Chart } from 'chart.js/auto';
import { analytics } from '../js/analytics.js';

export async function AnalyticsDashboard() {
  // Get analytics data
  const gameStats = await analytics.getGamePlayStats();
  const choiceStats = await analytics.getStoryChoiceStats();

  return `
    <div class="analytics-dashboard">
      <h2 class="text-center mb-4">Analytics Dashboard</h2>
      
      <!-- Summary Cards -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-dark text-white">
            <div class="card-body text-center">
              <h5 class="card-title">Total Game Plays</h5>
              <p class="display-4">${gameStats.total}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-dark text-white">
            <div class="card-body text-center">
              <h5 class="card-title">Total Story Choices</h5>
              <p class="display-4">${choiceStats.total}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-dark text-white">
            <div class="card-body text-center">
              <h5 class="card-title">Unique Games</h5>
              <p class="display-4">${Object.keys(gameStats.byGame).length}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-dark text-white">
            <div class="card-body text-center">
              <h5 class="card-title">Stories Tracked</h5>
              <p class="display-4">${Object.keys(choiceStats.byStory).length}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Game Plays by Game</h5>
              <canvas id="gamePlaysByGameChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Plays Over Time</h5>
              <canvas id="playsOverTimeChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Traffic Sources</h5>
              <canvas id="referrerChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Story Choices by Story</h5>
              <canvas id="storyChoicesChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Tables -->
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Game Play Details</h5>
              <div class="table-responsive">
                <table class="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Game Name</th>
                      <th>Plays</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(gameStats.byGame)
                      .sort((a, b) => b[1] - a[1])
                      .map(([game, count]) => `
                        <tr>
                          <td>${game}</td>
                          <td>${count}</td>
                        </tr>
                      `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5 class="card-title">Story Choice Details</h5>
              <div class="table-responsive">
                <table class="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Story</th>
                      <th>Choices Made</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(choiceStats.byStory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([story, count]) => `
                        <tr>
                          <td>${story}</td>
                          <td>${count}</td>
                        </tr>
                      `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize charts after dashboard is rendered
export function initializeCharts(gameStats, choiceStats) {
  // Chart.js configuration with dark theme
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  // Game Plays by Game Chart (Bar)
  const gamePlaysByGameCtx = document.getElementById('gamePlaysByGameChart');
  if (gamePlaysByGameCtx) {
    new Chart(gamePlaysByGameCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(gameStats.byGame),
        datasets: [{
          label: 'Plays',
          data: Object.values(gameStats.byGame),
          backgroundColor: 'rgba(220, 53, 69, 0.8)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 1
        }]
      },
      options: chartOptions
    });
  }

  // Plays Over Time Chart (Line)
  const playsOverTimeCtx = document.getElementById('playsOverTimeChart');
  if (playsOverTimeCtx) {
    const sortedDates = Object.keys(gameStats.byDate).sort();
    new Chart(playsOverTimeCtx, {
      type: 'line',
      data: {
        labels: sortedDates,
        datasets: [{
          label: 'Daily Plays',
          data: sortedDates.map(date => gameStats.byDate[date]),
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: chartOptions
    });
  }

  // Referrer Chart (Pie)
  const referrerCtx = document.getElementById('referrerChart');
  if (referrerCtx) {
    new Chart(referrerCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(gameStats.byReferrer),
        datasets: [{
          data: Object.values(gameStats.byReferrer),
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(40, 167, 69, 0.8)',
            'rgba(0, 123, 255, 0.8)',
            'rgba(111, 66, 193, 0.8)'
          ],
          borderColor: '#212529',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }

  // Story Choices Chart (Bar)
  const storyChoicesCtx = document.getElementById('storyChoicesChart');
  if (storyChoicesCtx) {
    new Chart(storyChoicesCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(choiceStats.byStory),
        datasets: [{
          label: 'Choices Made',
          data: Object.values(choiceStats.byStory),
          backgroundColor: 'rgba(255, 193, 7, 0.8)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1
        }]
      },
      options: chartOptions
    });
  }
}
