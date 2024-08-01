console.log("Service Worker loaded");

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon || 'icon.png',
        badge: data.badge || 'badge.png',
        data: {
            url: "http://localhost:4018/admin" // URL muốn điều hướng
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    const urlToOpen = event.notification.data.url;

    event.notification.close(); // Đóng thông báo

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                // Kiểm tra nếu trang đã được mở, thì chỉ cần focus vào nó
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Nếu trang chưa được mở, mở trang mới
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
