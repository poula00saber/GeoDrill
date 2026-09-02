/**
 * GEODRILL — UNIFIED Google Sheets web app
 * ========================================
 * A single Apps Script web app handles BOTH GEODRILL websites and appends to
 * the correct tab inside the SAME Google Spreadsheet:
 *
 *   1. Construction   -> tab "GEODRILL constructions"
 *   2. Geotechnical   -> tab "GEODRILL geotechnical"
 *
 * The website routes by sending a `site` field in the POST body:
 *   { site: "construction" }   or   { site: "geotechnical" }
 *
 * (Backward compatible: if `site` is missing it defaults to "construction",
 *  so the existing construction form keeps working unaided.)
 *
 * This is the single deployment URL shared by both Next.js API routes:
 *   GOOGLE_SHEET_WEBHOOK_URL = <this /exec URL>
 *   GOOGLE_SHEET_WEBHOOK_URL_GEOTECH = <this /exec URL>
 *
 * DEPLOY:
 *   1. In Google Sheets open Script Editor for the spreadsheet that contains
 *      BOTH tabs.
 *   2. Replace the script with this file's contents.
 *   3. Make sure the two tab names below match exactly.
 *   4. Deploy > New deployment > Web app:
 *        - Execute as : Me
 *        - Who has access : Anyone
 *   5. Copy the /exec URL into .env.local for both
 *      GOOGLE_SHEET_WEBHOOK_URL and GOOGLE_SHEET_WEBHOOK_URL_GEOTECH.
 */

var CONSTRUCTION_SHEET_NAME = "GEODRILL constructions"; // Must match the construction tab name exactly
var GEOTECHNICAL_SHEET_NAME = "GEODRILL geotechnical"; // Must match the geotech tab name exactly

function doPost(e) {
  try {
    var data = e && e.postData ? JSON.parse(e.postData.contents) : {};
    var site = String(data.site || "").toLowerCase().trim();

    // Backward compatibility: default to construction.
    if (!site) site = "construction";

    var sheetName;
    if (site === "construction") {
      sheetName = CONSTRUCTION_SHEET_NAME;
    } else if (site === "geotechnical" || site === "geotech") {
      sheetName = GEOTECHNICAL_SHEET_NAME;
    } else {
      throw new Error('Invalid site "' + site + '". Expected "construction" or "geotechnical".');
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet "' + sheetName + '" not found.');
    }

    if (site === "construction") {
      sheet.appendRow([
        data.fullName || "",                    // 1. Full Name
        data.companyName || data.company || "", // 2. Company Name
        data.email || "",                       // 3. Email
        data.phone || "",                       // 4. Phone
        data.projectDescription || "",          // 5. Project Description
        new Date(),                             // 6. Time
        data.notes || ""                        // 7. Notes
      ]);
    } else {
      sheet.appendRow([
        data.fullName || "",                    // 1. Full Name
        data.company || data.companyName || "", // 2. Company
        data.email || "",                       // 3. Email
        data.phone || "",                       // 4. Phone
        data.projectType || "",                 // 5. Project Type
        data.requiredService || "",             // 6. Required Service
        data.projectLocation || "",             // 7. Project Location
        data.projectDescription || "",          // 8. Project Description
        new Date()                              // 9. Time
      ]);
    }

    return JsonResponse_(200, { ok: true, site: site, sheet: sheetName });
  } catch (err) {
    return JsonResponse_(500, { ok: false, error: String(err) });
  }
}

/* Tests ---------------------------------------------------------------- */

function testConstruction() {
  doPost({
    postData: {
      contents: JSON.stringify({
        site: "construction",
        fullName: "Construction Test User",
        companyName: "Construction Test Company",
        email: "construction@example.com",
        phone: "+966500000000",
        projectDescription: "Construction test project",
        notes: "Test construction submission",
      }),
    },
  });
}

function testGeotechnical() {
  doPost({
    postData: {
      contents: JSON.stringify({
        site: "geotechnical",
        fullName: "Geotechnical Test User",
        company: "Geotechnical Test Company",
        email: "geotechnical@example.com",
        phone: "+966500000000",
        projectType: "Commercial",
        requiredService: "Geotechnical Investigation",
        projectLocation: "Riyadh, KSA",
        projectDescription: "Geotechnical test project",
      }),
    },
  });
}

function JsonResponse_(code, payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}