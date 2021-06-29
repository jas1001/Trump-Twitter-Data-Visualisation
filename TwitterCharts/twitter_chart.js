
// Graph showing trumps tweets from November 2020 to Janurary 2021
function combine_and_filter1(trump_tweets,tsne_data_trump, a) {
  //add tsne data to trump tweets
    trump_tweets = trump_tweets.map((trump_tweet, index) => 
    Object.assign(trump_tweet, tsne_data_trump[index]))
    //add an author property
    for(let tweet of trump_tweets){
      tweet.author = "Trump"
    }
    let tweets = [...trump_tweets];
    if (a == 12){
      // only include tweets containing one of these strings
      tweets = tweets.filter(tweet => ["fraud", "votes", "vote", 
      "election", "steal", "#steal", "win"].some(topic => tweet.text.includes(topic)));
      tweets = tweets.filter(tweet => new Date(tweet.datetime) > 
      new Date(2020, 07, 0) && new Date(tweet.datetime) < new Date(2020, 10, 0))
      } else 
      // Same tweets with different dates
    tweets = tweets.filter(tweet => new Date(tweet.datetime) > new Date(2020, 10, 0))
  
    if (a == 1) {
    //if statement using the graph assigned values to assign each graph a word
    tweets = tweets.filter(tweet => ["fraud", "votes", "vote", 
    "election", "steal", "#steal", "win" ].some(topic => tweet.text.includes(topic)));
    }   else if (a == 3){
      tweets = tweets.filter(tweet => ["votes"].some(topic => tweet.text.includes(topic)));
    } else if (a == 4){
      tweets = tweets.filter(tweet => ["election"].some(topic => tweet.text.includes(topic)));
    } else if (a == 5){
      tweets = tweets.filter(tweet => ["steal"].some(topic => tweet.text.includes(topic)));
    } else if (a == 6){
      tweets = tweets.filter(tweet => ["win"].some(topic => tweet.text.includes(topic)));
    } else if (a == 7){
      tweets = tweets.filter(tweet => ["fraud"].some(topic => tweet.text.includes(topic)));
    } else if (a == 8){
      tweets = tweets.filter(tweet => ["fraud", "votes", "vote", 
      "election", "steal", "#steal", "win"].some(topic => tweet.text.includes(topic)));
    }
    return tweets;
    
  }
  
  function make_plot1(tweets, a){
    let data = [{
      x: tweets.map(d => d.datetime),
      y: tweets.map(d => d.y),
      customdata: tweets.map(d => convertToParagraph(d.author + 
        d.datetime + ": " + d.text, 64)),
      marker: {
        color: tweets.map(d => d.author=="Trump"?0:1), 
        size: 8,
        colorscale: [ //custom color scheme
          ['0.0', 'rgb(255,0,0)'], 
          ['1.0', 'rgb(255,0,0)'],
        ]
      },
      mode: 'markers',
      type: 'scatter',
      hovertemplate:
        "%{customdata}" +
        "<extra></extra>", 
        //hide extra tooltip info
    }];
  
    let title = {
      // Title for 1st graph
      title: 'Trump Tweets from 2020/08 - 2020/10',
      xaxis: {
        title: 'Dates of Trump Tweets',
        visible: true,
        zeroline: false
      },
      yaxis: {
        title: 'Year',
        visible: false,
      },
    };
    let title2 = {
      // Title for second graph
      title: 'Trump Tweets from 2020/11 - 2021/01',
      xaxis: {
        title: 'Dates of Trump Tweets',
        visible: true,
        zeroline: false
      },
      yaxis: {
        title: 'Year',
        visible: false,
      },
    };
    let layout = {
      hovermode: "closest", 
      //hover closest by default
      plot_bgcolor:"transparent", 
      //make the plot backgound transparent
      paper_bgcolor:"transparent",
      width: 650,
      height: 500,
      margin: {
      // Change the margins to fit the content into the rectangle
        l: 20,
        r: 20,
        b: 80,
        t: 100,
        pad: 4
      },
    }
    // If statement using the values to display the data
    if (a < 12) 
      Plotly.newPlot('plotDiv', data, title2, layout);
     else if (a == 12)
      Plotly.newPlot('plotDiv2', data, title, layout);
  
  }
  
  Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
      Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
        // Give value to each graph
        b = 1
          let tweets2 = combine_and_filter1(trump_tweets,tsne_data_trump, b)
          make_plot1(tweets2, b);
      });
  });
  
    Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
        Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
          // Give value to each graph
          b = 12
            let tweets2 = combine_and_filter1(trump_tweets,tsne_data_trump, b)
            make_plot1(tweets2, b);
        });
    });
        
  
  //Function to grab different graphs when a button is clicked on the html page
  function getSelecttweets(selectObject) {
     var Svalue = selectObject.value; 
    Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
      Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
        // Using an if statement so the user can call different
        if (Svalue == 'Value1') 
        // Give a value to each graph to differentiate them when calling them above
          b = 3
            else if (Svalue == 'Value2') 
          b = 4
           else if (Svalue == 'Value3') 
          b = 5
          else if (Svalue == 'Value4') 
          b = 6
           else if (Svalue == 'Value5') 
          b = 7
          else if (Svalue == 'Value6') 
          b = 8
        //Using the plotly purge command to clear the graph when a new graph is choosen 
          Plotly.purge(plotDiv);
          let tweets2 = combine_and_filter1(trump_tweets,tsne_data_trump, b)
          make_plot1(tweets2, b);
        });
      });
      } 
  
  
  
  //from https://codereview.stackexchange.com/a/171857
  function convertToParagraph(sentence, maxLineLength){
    let lineLength = 0;
    sentence = sentence.split(" ")
    return sentence.reduce((result, word) => {
      if (lineLength + word.length >= maxLineLength) {
        lineLength = word.length;
        return result + `<br>${word}`;
      } else {
        lineLength += word.length + (result ? 1 : 0);
        return result ? result + ` ${word}` : `${word}`;
      }
    }, '');
  }
  
  /*  Fading our function taken from this website
  https://www.jqueryscript.net/animation/Parallax-Fade-out-Hero-Header-jQuery.html*/
  $(document).ready(function(){
    var moving__background = $(".parallax");
    $(window).scroll(function() { 
        moving__background.css('margin-top', ($(window).scrollTop())/3); 
        // Parallax scrolling
        moving__background.css('opacity', 1 - ($(window).scrollTop())/moving__background.height()); 
        // Fading out
    });
  });
  
  
  /* Stopthesteal Graph
  Data taken from https://www.bbc.com/news/world-us-canada-55592332*/
  function makeplot() {
    // Call data from stopthesteal csv file
    Plotly.d3.csv("stopthesteal.csv", function(data){ processData(data) } );
  };
  
  function processData(allRows) {
  
    var x = [], y = [], standard_deviation = [];
  // Getting data from all the rows in the csv
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['date_x'] );
      y.push( row['tweets_y'] );
    }    
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var traces = [{
      x: x,
      y: y,
      type: 'bar',
      marker: {
        color: 'rgb(255, 0, 0)',
        size: 7
      }
    }];
  
    var layout = {
        title: 'Number of tweets using the #stopthesteal in the lead up to the Capitol Riots',
        size: 10,
        width: 670,
        height: 300,
        margin: {
          l: 80,
          r: 20,
          b: 80,
          t: 100,
          pad: 4
        },
        xaxis: {
          title: 'Dates',
          size: 18,
        },
        yaxis: {
          title: 'Approx No of Tweets',
          size: 18,
        }
    };
    Plotly.newPlot('graphSteal', traces, layout,);
  };
    makeplot();