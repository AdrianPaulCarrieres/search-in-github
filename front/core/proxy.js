const base_url = "https://api.github.com"

export async function getUser(username) {
    const resp = await fetch(base_url + "/users/" + username)
    return await resp.json()
}

export async function mockApiUser() {
    return {
        "avatar_url": "https://avatars.githubusercontent.com/u/36892477?v=4",
        "bio": "En alternance à Myriad et à l'Efrei Paris",
        "blog": "",
        "company": "Myriad",
        "created_at": "2018-02-27T15:21:07Z",
        "email": "-",
        "events_url": "https://api.github.com/users/AdrianPaulCarrieres/events{/privacy}",
        "followers": 2,
        "followers_url": "https://api.github.com/users/AdrianPaulCarrieres/followers",
        "following": 3,
        "following_url": "https://api.github.com/users/AdrianPaulCarrieres/following{/other_user}",
        "gists_url": "https://api.github.com/users/AdrianPaulCarrieres/gists{/gist_id}",
        "gravatar_id": "",
        "hireable": "-",
        "html_url": "https://github.com/AdrianPaulCarrieres",
        "id": 36892477,
        "location": "Paris, France",
        "login": "AdrianPaulCarrieres",
        "name": "Adrian-Paul Carrières",
        "node_id": "MDQ6VXNlcjM2ODkyNDc3",
        "organizations_url": "https://api.github.com/users/AdrianPaulCarrieres/orgs",
        "public_gists": 0,
        "public_repos": 20,
        "received_events_url": "https://api.github.com/users/AdrianPaulCarrieres/received_events",
        "repos_url": "https://api.github.com/users/AdrianPaulCarrieres/repos",
        "site_admin": false,
        "starred_url": "https://api.github.com/users/AdrianPaulCarrieres/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/AdrianPaulCarrieres/subscriptions",
        "twitter_username": "AdrianCarrieres",
        "type": "User",
        "updated_at": "2021-11-24T10:33:23Z",
        "url": "https://api.github.com/users/AdrianPaulCarrieres",
    }
}