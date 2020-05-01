function home() {
  var soql = "SELECT Title, Summary, UrlName FROM Knowledge__kav LIMIT 100";
  force.query(
    soql,
    function (data) {
      var records = data.records;

      var start = '<ul class="table-view">';
      var end = "</ul>";
      var mid = "";

      /*
      records.forEach((entry) => {
        mid +=
          '<li class="table-view-cell"><div class="media-body">' +
          entry.Name +
          "</div></li>";
      });
      */
      for (var i = 0; i < records.length; i++) {
        mid +=
          '<li class="table-view-cell media"><a class="navigate-right" onclick="article(' +
          "'" +
          records[i].UrlName +
          "'" +
          ')"><div class="media-body">' +
          records[i].Title +
          "<p>";
        if (records[i].Summary != null) {
          mid += records[i].Summary;
        }
        mid += "</p></div></a></li>";
      }

      document.querySelector("#content").innerHTML = start + mid + end;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
}

function article(url) {
  var soql =
    "SELECT Title, Summary, Text__c FROM Knowledge__kav k WHERE k.UrlName = '" +
    url +
    "'";
  force.query(
    soql,
    function (data) {
      var records = data.records;

      var start = '<div class="content-padded">';
      var end = "</div>";
      var mid = "";

      mid += "<h2>" + records[0].Title + "</h2>";
      if (records[0].Summary != null) {
        mid += "<h4>" + records[0].Summary + "</h4>";
      }
      if (records[0].Text__c != null) {
        mid += "<p>" + records[0].Text__c + "</p>";
      }

      document.querySelector("#content").innerHTML = start + mid + end;
    },
    function (error) {
      alert("Failed to fetch article: " + error);
    }
  );
}

function poll() {
  document.querySelector("#content").innerHTML = "poll";
}

function leaderboard() {
  document.querySelector("#content").innerHTML = "";

  var soql = "SELECT Id, Name FROM Contact LIMIT 100";
  force.query(
    soql,
    function (data) {
      var records = data.records;

      var start = '<ul id="contacts" class="table-view content">';
      var end = "</ul>";
      var mid = "";

      /*
      records.forEach((entry) => {
        mid +=
          '<li class="table-view-cell"><div class="media-body">' +
          entry.Name +
          "</div></li>";
      });
      */
      for (var i = 0; i < records.length; i++) {
        mid +=
          '<li class="table-view-cell"><div class="media-body">' +
          records[i].Name +
          "</div></li>";
      }

      document.querySelector("#content").innerHTML = start + mid + end;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
}

function profiel() {
  document.querySelector("#content").innerHTML =
    "profiel<br />profiel<br />profiel<br />profiel<br />profiel<br />profiel<br />";
}
