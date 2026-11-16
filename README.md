# Data Explorer

From the repository root, run `py -m http.server 8000` and open
http://localhost:8000/. Click **Load / retry posts**.

For JS65, use DevTools Network to check a normal load. Temporarily change
the endpoint in app.js to /not-a-real-resource and reload to check HTTP 404.
Restore /posts, reload, and load the posts. With the page open, switch
DevTools Network to Offline and click again. Switch back online and retry.
Expect 100 posts after recovery.

