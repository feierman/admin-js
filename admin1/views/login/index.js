loginform.onsubmit = async function (e) {
	e.preventDefault();
	const usernameRegex = /^[a-zA-Z]+$/;
	const xieyi = document.getElementById("xieyi");
	const passwordRegex = /^.{3,}$/;
	if (username.value.trim() === "" || password.value.trim() === "") {
		errorMessage("用户名和密码不能位空");
		return;
	}
	if (!usernameRegex.test(username.value)) {
		errorMessage("请输入有效的用户名");
		return;
	}
	if (!passwordRegex.test(password.value)) {
		errorMessage("请输入有效的密码");
		return;
	}
	if (!xieyi.checked) {
		alert("请先同意用户协议");

		return;
	}
	let res = await fetch(
		`http://localhost:3000/users?username=${username.value}&&password=${password.value}`
	)
		.then((res) => res.json())
		.then((res) => {
			if (res.length > 0) {
				localStorage.setItem(
					"token",
					JSON.stringify({
						...res[0],
						username: res[0].username,
						password: "****",
					})
				);
				location.href = "/admin1/views/home/index.html";
			} else {
				errorMessage();
			}
		});
};
function errorMessage(select) {
	const errormessage = document.getElementById("error-message");
	//解除隐藏
	errormessage.style.display = "block";
	// 添加文本
	errormessage.innerText = select;
}
