import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent implements OnInit {
  @Input() messages: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.messages.forEach((message, index) => {
      // Automatically fade out each notification after 3 seconds
      setTimeout(() => {
        this.fadeOutNotification(index);
      }, 3000 * (index + 1)); // 3000 milliseconds (3 seconds) for each notification
    });
  }

  // Method to add the fade-out class for a specific notification
  private fadeOutNotification(index: number) {
    const notifications = document.querySelectorAll('.toast-notification');
    if (notifications.length > index) {
      const notification = notifications[index];
      notification.classList.add('fade-out');

      // Remove the notification element from the DOM after the animation completes
      notification.addEventListener('animationend', () => {
        notification.remove();
      });
    }
  }
}
