import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular'; // Import Apollo and gql for GraphQL
import { UserService } from '../services/userservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Add this property to display error messages

  constructor(private router: Router, private apollo: Apollo, private userService: UserService) {}

  redirectToStockMarket() {
    this.router.navigate(['/stock-market']);
  }

  createUser() {
    const createUserMutation = gql`
      mutation createUser($username: String!) {
        createUser(input: { username: $username }) {
          username
          userID
        }
      }
    `;
  
    // Send the GraphQL mutation to create a user
    this.apollo.mutate({
      mutation: createUserMutation,
      variables: {
        username: this.username,
      },
    }).subscribe(
      (response: any) => {
        // Successful user creation
        this.errorMessage = ''; // Clear any previous error message
        const userId = parseInt(response.data.createUser.userID, 10); // Parse to integer
        console.log('User logged in with ID:', userId); // Print userID to console
        this.userService.setUserData(userId, this.username);
        this.redirectToStockMarket();
      },
      (error: any) => {
        // Error handling for duplicate username
        if (error?.message === 'Username is already taken.') {
          this.errorMessage = 'Username is already taken.';
        } else {
          this.errorMessage = 'An error occurred while creating the user.';
        }
      }
    );
  }
}
