function home() {
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Home")) {
      el.classList.add("active");
    }
  }
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
          '<li class="table-view-cell media"><div class="media-body"><a class="navigate-right" onclick="article(' +
          "'" +
          records[i].UrlName +
          "'" +
          ')">' +
          records[i].Title +
          "<p>";
        if (records[i].Summary != null) {
          mid += records[i].Summary;
        }
        mid += "</p></a></div></li>";
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
  document.querySelector("#content").innerHTML = "";
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Poll")) {
      el.classList.add("active");
    }
  }

  var soql_answers =
    "SELECT acpoll__Answer__c, acpoll__Order__c, acpoll__Poll__c, Name FROM acpoll__Poll_Answer__c";
  var answers = "";
  var soql_poll = "SELECT acpoll__Name__c, Name FROM acpoll__Poll__c";
  var polls = "";
  var soql_result =
    "SELECT acpoll__Poll__c, acpoll__Poll_Answer__c, acpoll__User__c, Name FROM acpoll__Voting_Result__c";
  var results = "";

  force.query(
    soql_answers,
    function (data) {
      var records = data.records;
      answers += "<h1>Answers</h1>" + '<ul id="contacts" class="table-view">';

      for (var i = 0; i < records.length; i++) {
        answers +=
          '<li class="table-view-cell"><div class="media-body">' + i + "</br>";

        answers += records[i].Name + "</br>";
        answers += records[i].acpoll__Poll__c + "</br>";
        answers += records[i].acpoll__Order__c + "</br>";
        answers += records[i].acpoll__Answer__c + "</br>";

        answers += "</div></li>";
      }
      answers += "</ul>";
      document.querySelector("#content").innerHTML += answers;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
  force.query(
    soql_poll,
    function (data) {
      var records = data.records;
      polls += "<h1>Polls</h1>" + '<ul id="contacts" class="table-view">';

      for (var i = 0; i < records.length; i++) {
        polls +=
          '<li class="table-view-cell"><div class="media-body">' + i + "</br>";

        polls += records[i].Name + "</br>";
        polls += records[i].acpoll__Name__c + "</br>";

        polls += "</div></li>";
      }
      polls += "</ul>";
      document.querySelector("#content").innerHTML += polls;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
  force.query(
    soql_result,
    function (data) {
      var records = data.records;
      results += "<h1>Results</h1>" + '<ul id="contacts" class="table-view">';

      for (var i = 0; i < records.length; i++) {
        results +=
          '<li class="table-view-cell"><div class="media-body">' + i + "</br>";

        results += records[i].acpoll__Poll__c + "</br>";
        results += records[i].acpoll__Poll_Answer__c + "</br>";
        results += records[i].acpoll__User__c + "</br>";
        results += records[i].Name + "</br>";

        results += "</div></li>";
      }
      results += "</ul>";
      document.querySelector("#content").innerHTML += results;
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
  /*
  force.query(
    soql_poll,
    function (data) {
      var records = data.records;
      polls += "<h1>Polls</h1>";
      records.forEach((record) => {
        polls += "<p>";
        for (const field in record) {
          if (record.hasOwnProperty(field)) {
            const value = record[field];
            polls += field + ": " + value + "<br>";
          }
        }
        polls += "</p>";
      });
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
  force.query(
    soql_result,
    function (data) {
      var records = data.records;
      polls += "<h1>Results</h1>";
      records.forEach((record) => {
        polls += "<p>";
        for (const field in record) {
          if (record.hasOwnProperty(field)) {
            const value = record[field];
            polls += field + ": " + value + "<br>";
          }
        }
        polls += "</p>";
      });
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
  */
}

function leaderboard() {
  document.querySelector("#content").innerHTML = "";
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Leaderboard")) {
      el.classList.add("active");
    }
  }

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

function pollBuild() {
  //document.querySelector("#content").innerHTML = "";
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Poll")) {
      el.classList.add("active");
    }
  }

  // acpoll_name is titel, Name is ID
  var soql_answers =
    "SELECT ID, acpoll__Name__c, \
        (SELECT ID, acpoll__Answer__c \
        FROM acpoll__Answers__r) \
    FROM acpoll__Poll__c";
  var soql_votes =
    "SELECT ID, \
        (SELECT ID, acpoll__User__c, acpoll__Poll__c \
        FROM acpoll__Voting_Results__r) \
    FROM acpoll__Poll_Answer__c";
  force.query(
    soql_answers,
    function (data) {
      var records = data.records;

      force.query(
        soql_votes,
        function (vote_data) {
          var vote_records = vote_data.records;

          var start = '<div class="content-padded"><form class="input-group">';
          var mid = "";
          var end = "</form></div>";

          for (var i = 0; i < records.length; i++) {
            // hiet titel van poll
            mid +=
              '<div class="card content-padded"><h2>' +
              records[i].acpoll__Name__c +
              "</h2>";

            var vote_id = "";

            for (var v = 0; v < vote_records.length; v++) {
              if (vote_records[v].acpoll__Voting_Results__r) {
                for (
                  var z = 0;
                  z < vote_records[v].acpoll__Voting_Results__r.totalSize;
                  z++
                ) {
                  if (
                    vote_records[v].acpoll__Voting_Results__r.records[z]
                      .acpoll__Poll__c == records[i].Id &&
                    vote_records[v].acpoll__Voting_Results__r.records[z]
                      .acpoll__User__c == "0053X00000CAlh6QAD"
                  ) {
                    vote_id =
                      vote_records[v].acpoll__Voting_Results__r.records[z].Id;
                  }
                }
              }
            }

            for (var j = 0; j < records[i].acpoll__Answers__r.totalSize; j++) {
              var answer_votes = 0;
              var check = "";
              for (var v = 0; v < vote_records.length; v++) {
                if (
                  vote_records[v].Id ==
                  records[i].acpoll__Answers__r.records[j].Id
                ) {
                  if (vote_records[v].acpoll__Voting_Results__r) {
                    answer_votes =
                      vote_records[v].acpoll__Voting_Results__r.totalSize;
                    for (
                      var z = 0;
                      z < vote_records[v].acpoll__Voting_Results__r.totalSize;
                      z++
                    ) {
                      if (
                        vote_records[v].acpoll__Voting_Results__r.records[z]
                          .acpoll__User__c == "0053X00000CAlh6QAD"
                      ) {
                        check = "checked";
                      }
                    }
                  }
                }
              }

              mid +=
                '<input type="radio" id="' +
                records[i].acpoll__Answers__r.records[j].Id +
                '" onclick="radio_checked(\'' +
                records[i].Id +
                "', '" +
                records[i].acpoll__Answers__r.records[j].Id +
                "', '" +
                vote_id +
                '\');" value="' +
                records[i].acpoll__Answers__r.records[j].Id +
                '" ' +
                'name="' +
                records[i].Id +
                '"' +
                check +
                ">";
              mid +=
                '<label for="' +
                records[i].acpoll__Answers__r.records[j].Id +
                '" ' +
                " >" +
                records[i].acpoll__Answers__r.records[j].acpoll__Answer__c +
                " : " +
                answer_votes +
                " votes" +
                "</label><br>";
            }
            mid += "</div>";
          }

          document.querySelector("#content").innerHTML = start + mid + end;
        },
        function (error) {
          alert("Failed to fetch contacts: " + error);
        }
      );
    },
    function (error) {
      alert("Failed to fetch contacts: " + error);
    }
  );
}

function radio_checked(q_id, ans_id, vote_id) {
  /*
  alert(
    "TODO: update backend. Checked with q_id " +
      JSON.stringify(q_id) +
      " ans_id " +
      JSON.stringify(ans_id) +
      " q_id " +
      JSON.stringify(vote_id)
  );
  */
  // delete record if it exists already for a given question

  if (vote_id != "") {
    force.del(
      "acpoll__Voting_Result__c",
      vote_id,
      function (success) {
        // create a new record for the question and the answer
        var req_fields = {
          acpoll__Poll__c: q_id,
          acpoll__Poll_Answer__c: ans_id,
          acpoll__User__c: "0053X00000CAlh6QAD", //TODO: vj tony checked id veranderen hierboven
        };
        force.create(
          "acpoll__Voting_Result__c",
          req_fields,
          function (success) {
            pollBuild();
          },
          function (error) {
            alert("Failed to add vote: " + error);
          }
        );
      },
      function (error) {
        alert(
          "Je probeert wat te snel te veranderen. Is geen probleem zonder deze popup, maar heb ze nodig om te debuggen. Failed to delete vote: " +
            error
        );
      }
    );
  } else {
    // create a new record for the question and the answer
    var req_fields = {
      acpoll__Poll__c: q_id,
      acpoll__Poll_Answer__c: ans_id,
      acpoll__User__c: "0053X00000CAlh6QAD", //TODO: vj tony checked id veranderen hierboven
    };
    force.create(
      "acpoll__Voting_Result__c",
      req_fields,
      function (success) {
        pollBuild();
      },
      function (error) {
        alert("Failed to add vote: " + error);
      }
    );
  }
}

function profiel() {
  document.querySelector("#content").innerHTML =
    "profiel<br />profiel<br />profiel<br />profiel<br />profiel<br />profiel<br />";

  //document.querySelectorAll("nav a").classList.remove("active");
  //document.querySelector("nav a#profiel").classList.add("active");
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Profiel")) {
      el.classList.add("active");
    }
  }
}
