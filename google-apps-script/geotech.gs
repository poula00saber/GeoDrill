/**
 * GEODRILL — GEOTECHNICAL Google Sheet web app
 * =============================================
 * Deploy this as a SEPARATE Apps Script web app from the construction one.
 * It appends new lead rows to the "GEODRILL geotechnical" tab of the same
 * (or a different) Google Spreadsheet.
 *
 * HOW TO DEPLOY (second web app / second deployment):
 *   1. In Google Sheets open Script Editor for the spreadsheet containing the
 *      "GEODRILL geotechnical" tab.
 *   2. Replace the script with this file's contents.
 *   3. Set SHEET_NAME below to exactly match your geotechnical tab name.
 *   4. Deploy > New deployment > Web app:
 *        - Execute as : Me
 *        - Who has access : Anyone
 *   5. Copy the /exec URL into .env.local as
 *        GOOGLE_SHEET_WEBHOOK_URL_GEOTECH=<url>
 *      (do NOT overwrite the construction GOOGLE_SHEET_WEBHOOK_URL).
 */

var SHEET_NAME = "GEODRILL geotechnical"; // Must match your geotech tab name exactly

function doPost(e) {
  try {
    var data = e && e.postData ? JSON.parse(e.postData.contents) : {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found.');
    }

    sheet.appendRow([
      data.fullName || "",            // 1. Full Name
      data.company || "",             // 2. Company
      data.email || "",               // 3. Email
      data.phone || "",               // 4. Phone
      data.projectType || "",         // 5. Project Type
      data.requiredService || "",     // 6. Required Service
      data.projectLocation || "",     // 7. Project Location
      data.projectDescription || "",  // 8. Project Description
      new Date(),                     // 9. Time (auto timestamp)
    ]);

    return JsonResponse_(200, { ok: true });
  } catch (err) {
    return JsonResponse_(500, { ok: false, error: String(err) });
  }
}

function setUpDemoRow() {
  doPost({
    postData: {
      contents: JSON.stringify({
        fullName: "Demo User",
        company: "Demo Company",
        email: "demo@example.com",
        phone: "+966500000000",
        projectType: "Commercial",
        requiredService: "Geotechnical Investigation",
        projectLocation: "Riyadh, KSA",
        projectDescription: "Test project description",
      }),
    },
  });
}

function JsonResponse_(code, payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}