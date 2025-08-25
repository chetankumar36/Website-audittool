// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auditForm");
  const urlInput = document.getElementById("websiteUrl");
  const resultsDiv = document.getElementById("results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    const url = urlInput.value.trim();

    if (!url) {
      resultsDiv.innerHTML = "<p style='color:red;'>⚠️ Please enter a valid URL</p>";
      return;
    }

    try {
      // Call backend API
      const response = await fetch("http://localhost:5000/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (response.ok) {
        resultsDiv.innerHTML = `
          <h3>🌐 Audit Results for: ${data.url}</h3>
          <p><b>Performance:</b> ${data.performance}</p>
          <p><b>Accessibility:</b> ${data.accessibility}</p>
          <p><b>SEO:</b> ${data.seo}</p>
          <p><b>Security:</b> ${data.security}</p>
        `;
      } else {
        resultsDiv.innerHTML = `<p style='color:red;'>❌ ${data.error}</p>`;
      }
    } catch (error) {
      console.error("Error fetching audit:", error);
      resultsDiv.innerHTML = "<p style='color:red;'>🚨 Server not responding</p>";
    }
  });
});
