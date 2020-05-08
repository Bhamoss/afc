function home() {
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Home")) {
      el.classList.add("active");
    }
  }
  document.querySelector("header").innerHTML =
    '<h1 class="title">RED DEVILS</h1>';

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
          '<li class="table-view-cell media"><div class="media-body"><a class="navigate-right lel" onclick="article(' +
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
      document.querySelector("header").innerHTML =
        '<a class="icon icon-left-nav pull-left" onclick="home()"></a><h1 class="title">RED DEVILS</h1>';
    },
    function (error) {
      alert("Failed to fetch article: " + error);
    }
  );
}

function poll() {
  document.querySelector("#content").innerHTML = "";
  document.querySelector("header").innerHTML =
    '<h1 class="title">RED DEVILS</h1>';
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
  document.querySelector("header").innerHTML =
    '<h1 class="title">RED DEVILS</h1>';
  els = document.querySelectorAll("nav a");
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Leaderboard")) {
      el.classList.add("active");
    }
  }

  var soql_labels =
    "SELECT Label, Threshold FROM ReputationLevel WHERE ParentId = '0DB3X000000kBu7WAE'  ORDER BY Threshold ASC NULLS LAST";
  var soql_reputation_points =
    "SELECT ReputationPoints, MemberId FROM NetworkMember WHERE NetworkId = '0DB3X000000kBu7WAE' ORDER BY ReputationPoints DESC NULLS LAST";
  var soql_users = "SELECT Id, CommunityNickname FROM User";
  force.query(
    soql_labels,
    function (data_labels) {
      force.query(
        soql_reputation_points,
        function (data_rep) {
          force.query(
            soql_users,
            function (data_user) {
              var labels = data_labels.records;
              var reps = data_rep.records;
              var users = data_user.records;

              var start = '<ul class="table-view">';
              var end = "</ul>";
              var mid = "";

              for (var i = 0; i < reps.length; i++) {
                var name = "test user";
                var points = reps[i].ReputationPoints;
                var label = "test label";

                for (var j = 0; j < users.length; j++) {
                  if (users[j].Id == reps[i].MemberId) {
                    name = users[j].CommunityNickname;
                    break;
                  }
                }
                for (var j = 0; j < labels.length; j++) {
                  if (labels[j].Threshold > points) {
                    break;
                  }
                  label = labels[j].Label;
                }

                mid +=
                  '<li class="table-view-cell">' +
                  '<span class="badge">' +
                  points +
                  "</span>" +
                  (i + 1) +
                  " - " +
                  name +
                  "<p>" +
                  label +
                  "</p>" +
                  "</li>";
              }

              document.querySelector("#content").innerHTML = start + mid + end;
            },
            function (error) {
              alert("Failed to fetch users: " + error);
            }
          );
        },
        function (error) {
          alert("Failed to fetch reputations: " + error);
        }
      );
    },
    function (error) {
      alert("Failed to fetch labels: " + error);
    }
  );
}

function pollBuild() {
  //document.querySelector("#content").innerHTML = "";
  document.querySelector("header").innerHTML =
    '<h1 class="title">RED DEVILS</h1>';
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
              '<div class="card poll content-padded"><h2>' +
              records[i].acpoll__Name__c +
              "</h2><br>";

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
                " >  &nbsp;  " +
                records[i].acpoll__Answers__r.records[j].acpoll__Answer__c +
                " : " +
                answer_votes +
                " stemmen" +
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
  force.els = document.querySelectorAll("nav a");
  document.querySelector("header").innerHTML =
    '<h1 class="title">RED DEVILS</h1>';
  for (var i = 0; i < els.length; i++) {
    el = els[i];
    el.classList.remove("active");
    if (el.textContent.includes("Profiel")) {
      el.classList.add("active");
    }
  }

  var user_id = "0053X00000CAlh6QAD";
  var soql =
    "SELECT Name, Username, Email, CommunityNickname FROM User WHERE Id = '" +
    user_id +
    "'";
  force.query(
    soql,
    function (data) {
      var user = data.records[0];
      var start = '<div class="card"><ul class="table-view">';
      var mid_start = '<li class="table-view-cell">';
      var mid_end = "</li>";
      var mid = "";
      var end = "</ul></div>";

      mid += mid_start + "Naam" + "<p>" + user.Name + "</p>" + mid_end;
      mid +=
        mid_start +
        "Community naam" +
        "<p>" +
        user.CommunityNickname +
        "</p>" +
        mid_end;
      mid += mid_start + "Email" + "<p>" + user.Email + "</p>" + mid_end;
      mid +=
        mid_start + "Gebruikersnaam" + "<p>" + user.Username + "</p>" + mid_end;

      var edit_btn =
        '<button onclick="edit_profile()" class="btn btn-primary btn-block">Profiel aanpassen</button>';
      var logout_btn =
        '<button onclick="logout()" class="btn btn-negative btn-block">Log uit</button>';
      document.querySelector("#content").innerHTML =
        start + mid + end + edit_btn + logout_btn;
    },
    function (error) {
      alert("Failed to add vote: " + error);
    }
  );
}

function edit_profile() {
  var user_id = "0053X00000CAlh6QAD";
  var soql = "SELECT CommunityNickname FROM User WHERE Id = '" + user_id + "'";
  force.query(
    soql,
    function (data) {
      var user = data.records[0];
      var start = '<form name="profiel"  action="javascript:void(0);">';
      var mid = "";
      var end = "</form>";

      mid +=
        "<br><h3>" +
        "Gebruikersnaam" +
        "</h3>" +
        '<input name="gn" type="text" placeholder="' +
        user.CommunityNickname +
        '">';
      mid +=
        '<button class="btn btn-negative btn-block" onclick="annuleer()">Annuleer</button>';
      mid +=
        '<button class="btn btn-positive btn-block" onclick="save_edit()">Opslaan</button>';
      document.querySelector("#content").innerHTML = start + mid + end;
    },
    function (error) {
      alert("Failed to add vote: " + error);
    }
  );
}

function logout() {
  oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
  oauthPlugin.logout();
}

function annuleer() {
  profiel();
}

function save_edit() {
  var user_id = "0053X00000CAlh6QAD";
  var val = document.forms["profiel"]["gn"].value;
  if (val != "") {
    force.update(
      "User",
      {
        Id: user_id,
        CommunityNickname: val,
      },
      function (r) {
        sleep(500);
        profiel();
      },
      function (error) {
        alert("Failed to add change name: " + error);
      }
    );
  } else {
    profiel();
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  var currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
