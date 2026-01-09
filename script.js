
        let followers = [];
        let names = [];

        const profile = [
            "https://api.github.com/users/torvalds",
            "https://api.github.com/users/gaearon",
            "https://api.github.com/users/sindresorhus",
            "https://api.github.com/users/tj",
            "https://api.github.com/users/addyosmani",
            "https://api.github.com/users/mojombo",
            "https://api.github.com/users/yyx990803",
            "https://api.github.com/users/dhh",
        ];

        async function userdata(profileUrls) {
            const promises = profileUrls.map(url =>
                fetch(url).then(res => res.ok ? res.json() : null)
            );

            const results = await Promise.all(promises);

            results.forEach(user => {
                if (user) {
                    names.push(user.name || user.login); // Fallback to login if name is null
                    followers.push(user.followers);
                }
            });

            showBar(); 
        }

        function showBar() {
            const colors = followers.map(f => {
                if (f <= 5000) return '#58d68d';
                if (f <= 20000) return '#f5b041';
                if (f <= 50000) return '#5dade2';
                return '#ec7063';
            });

            const data = [{
                x: names,
                y: followers,
                type: 'bar',
                marker: { 
                    color: colors,
                    line: { width: 1.5, color: 'rgba(0,0,0,0.1)' }
                }
            }];

            const layout = {
                title: { text: 'GitHub Followers Count', font: { size: 20 } },
                xaxis: { title: 'Developers', tickangle: -45 },
                yaxis: { title: 'Followers' },
                margin: { b: 100 } // Space for slanted names
            };

            Plotly.newPlot('myDiv', data, layout, {responsive: true});
        }

        function showPie() {
            const data = [{
                labels: names,
                values: followers,
                type: 'pie',
                hole: 0.4, // Makes it a donut chart (modern look)
                textinfo: "label+percent",
                insidetextorientation: "radial"
            }];

            const layout = {
                title: { text: 'Follower Distribution', font: { size: 20 } },
                showlegend: true,
                legend: { orientation: 'h', y: -0.2 }
            };

            Plotly.newPlot('myDiv', data, layout, {responsive: true});
        }

        userdata(profile);
