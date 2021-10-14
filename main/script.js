const searchForm = document.getElementById("search-form");

const getUser = async (url, user) => {
  const n_user = user.split(" ").join("");
  let data = await fetch(`${url}${n_user}`);
  return data;
};

const setUser = (data) => {
  data
    .then((result) => result.json())
    .then((data) => {
      if (data.message === "Not Found") {
        document.querySelector(".no-result").style.display = "block";
      } else {
        document.querySelector(".no-result").style.display = "none";
        document.getElementById("avatar").src = `${data.avatar_url}`;
        const name = data.name;
        document.getElementById("profile-name").innerText = !name
          ? `${data.login || ""}`
          : `${data.name}`;
          const loginName = data.login;
        document.getElementById(
          "profile-username"
        ).innerText = !loginName ? "": `@${data.login}`;
        const joinDate = data.created_at.substring(0, 10);
        document.getElementById(
          "profile-join-date"
        ).innerText = `Joined ${joinDate}`;
        const bio = data.bio;
        document.getElementById("profile-bio").innerText = !bio
          ? "This profile has no bio"
          : `${data.bio}`;

        document.getElementById("profile-bio").style.opacity = !bio
          ? "0.5"
          : "1";

        
        document.getElementById("repos").innerText = `${data.public_repos}`;
        document.getElementById("followers").innerText = `${data.followers}`;
        document.getElementById("following").innerText = `${data.following}`;
        const location = data.location;
        const blog = data.blog;
        const twitterUsername = data.twitter_username;
        const company = data.company;
        document.getElementById("location").innerText = !location
          ? "Not available"
          : `${location}`;

        document.querySelector(".location").style.opacity = !location
          ? "0.5"
          : "1";

        document.getElementById("blog").innerText = !blog
          ? "Not available"
          : `${blog.substring(0, 20)}`;

        document.getElementById("blog").href = !blog
          ? "Not available"
          : `${blog}`;

          document.querySelector(".blog").style.opacity = !blog
          ? "0.5"
          : "1";
          
        document.getElementById("twitter").innerText = !twitterUsername
          ? "Not avialable"
          : `${twitterUsername}`;
        document.getElementById("twitter").href = !twitterUsername
          ? "#"
          : `https://twitter.com/${twitterUsername}`;
          document.querySelector(".twitter").style.opacity = !twitterUsername
          ? "0.5"
          : "1";
        document.getElementById("company").innerText = !company
          ? "Not available"
          : `${company}`;
        document.getElementById("company").href = !company
          ? "#"
          : `https://github.com/${company.substring(1, 8)}`;

          document.querySelector(".company").style.opacity = !company
          ? "0.5"
          : "1";
      }
    });
};

const octocat = getUser("https://api.github.com/users/", "octocat");
setUser(octocat);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.getElementById("search").value;

  const data = getUser("https://api.github.com/users/", search);
  setUser(data);
});

function detectColorScheme() {
  let theme = "light";
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }

  if (theme == "dark") {
    document.querySelector("html").classList.add("theme-dark");
    document.querySelector("html").classList.remove("theme-light");
    document.querySelector(".moon-icon").style.display = "none";
    document.querySelector(".sun-icon").style.display = "block";
    document.querySelector("output").innerText = "light";
  } else {
    document.querySelector("html").classList.remove("theme-dark");
    document.querySelector("html").classList.add("theme-light");
    document.querySelector(".sun-icon").style.display = "none";
    document.querySelector(".moon-icon").style.display = "block";
    document.querySelector("output").innerText = "dark";
  }
}

detectColorScheme();

var darkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
var toggle = function () {
  document.querySelector("html").classList.remove("theme-default");

  if (darkMode) {
    document.querySelector("html").classList.add("theme-light");
    document.querySelector("html").classList.remove("theme-dark");
  } else {
    document.querySelector("html").classList.remove("theme-light");
    document.querySelector("html").classList.add("theme-dark");
  }

  darkMode = !darkMode;

  document.querySelector("output").innerText = darkMode ? "light" : "dark";
  document.querySelector(".sun-icon").style.display = darkMode
    ? "block"
    : "none";
  document.querySelector(".moon-icon").style.display = darkMode
    ? "none"
    : "block";

};

document.querySelector(".theme-toggle").addEventListener("click", toggle);
