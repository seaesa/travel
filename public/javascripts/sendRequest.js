export const getRequest = async (data = {}, config) => {
  fetch(config && config.url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export const postRequest = async (data = {}, config, action) => {
  const response = await fetch(`${config.url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  if (response.ok) action && action(response);

}

export const deleteRequest = async (data = {}, config = null, action) => {
  const response = await fetch(`${config?.url && config.url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  })
  if (response.ok) action && action(response);
}


const putRequest = async (data) => {
  fetch('', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    }
  })
}
const patchRequest = async (data) => {
  fetch('', {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    }
  })
}