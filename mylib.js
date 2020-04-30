function home() {
  document.querySelector("#content").innerHTML = "home";

  var soql = "SELECT Text__c FROM Knowledge__kav LIMIT 100";
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
        if (records[i].Text__c != null) {
          mid +=
            '<li class="table-view-cell"><div class="media-body">' +
            records[i].Text__c +
            "</div></li>";
        }
      }

      document.querySelector("#content").innerHTML = start + mid + end;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
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
