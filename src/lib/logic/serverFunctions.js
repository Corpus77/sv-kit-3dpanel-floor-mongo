import { invalidateAll } from '$app/navigation';


function refresh(currentLogin, currentPassword) {
	fetch('/api/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;utf-8'
		},

		body: JSON.stringify({
			login: currentLogin,
			password: currentPassword
		})
	}).then(() => {
		invalidateAll();
	});
}

function exit() {
  fetch('/api/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;utf-8'
    },

    body: JSON.stringify({ login: '', password: '' })
  }).then(() => {
    invalidateAll();
    window.location.reload();
  });
}

export { refresh, exit };
