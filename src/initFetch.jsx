export default function initFetch(baseUrl) {
    function get(url) {
      return new Promise((resolve, reject) => {
        fetch(baseUrl + url)
          .then((response) => response.json())
          .then((data) => {
            if (!data) {
              return reject(data);
            }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  
    function post(url, body) {
      return new Promise((resolve, reject) => {
        fetch(baseUrl + url, {
          ...{
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data) {
              return reject(data);
            }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  
    function del(url) {
      return new Promise((resolve, reject) => {
        fetch(baseUrl + url, { method: "delete" })
          .then((response) => response.json())
          .then((data) => {
            if (!data) {
              return reject(data);
            }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  
    return { get, post, del };
  }