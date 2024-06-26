export const en = {
  navbar: {
    home: 'Home',
    courses: 'Courses',
    account: 'Account',
    logout: 'Logout',
    'logout-success': 'Logged out successfully.',
    login: 'Login',
    'language-change': 'Change Language',
  },
  footer: {
    home: 'Home',
    courses: 'Courses',
    account: 'Account',
    legal: 'Legal',
    copyright: 'Copyright © {{ currentYear }} - All rights reserved',
    'made-with-love': 'Made with ❤️ by',
    chorizo: 'Chorizo',
  },
  homepage: {
    title: 'Home',
    markdownRenderer: {
      about: {
        title: 'About',
      },
    },
    latestCourses: {
      title: 'Latest Courses',
      'error-message': 'No courses available',
    },
  },
  courses: {
    title: 'Courses',
    'no-courses-title': 'Nothing found',
    'no-courses-message': 'No courses available, please try again later.',
    'error-title': 'Error occurred',
    'error-message': 'Error loading courses',
    filter: {
      search: 'Search',
      sort: {
        latest: 'Latest',
        oldest: 'Oldest',
      },
    },
  },
  feedbackMessage: {
    'default-title': 'Oops!',
    'default-message': 'Something went wrong.',
  },
  accountProfileBanner: {
    'change-avatar': 'Change Avatar',
    'load-avatar-error': 'Error loading avatar',
  },
  account: {
    account: 'Account',
    name: 'Name',
    'name-placeholder': 'Please enter your name',
    email: 'Email',
    'email-placeholder': 'Please enter your email',
    bio: 'Bio',
    'bio-placeholder': 'Please enter your bio',
    update: 'Update',
    'last-updated': 'Last updated',
    'load-user-data-error': 'Error loading user data',
    'update-avatar-success': 'Avatar updated successfully',
    'update-avatar-error': 'Error updating avatar',
    'update-profile-success': 'Your profile has been updated successfully.',
    'update-profile-error': 'An error occurred while updating your profile.',
    'parse-errors': {
      required: 'This field is required',
      'invalid-username': 'Invalid username',
      'invalid-email': 'Invalid email',
      'bio-length': 'Bio must be between 3 and 800 characters long',
      'min-length': 'Minimum length is {{min}} characters',
      'max-length': 'Maximum length is {{max}} characters',
    },
  },
  login: {
    title: 'Login',
    'credentials-description': 'Enter your credentials to access your account.',
    'email-label': 'Email',
    'email-placeholder': 'Email',
    'password-label': 'Password',
    'password-placeholder': 'Password',
    'credentials-submit': 'Login',
    'no-account-message': "Don't have an account?",
    'register-link': 'Register',
    'parse-errors': {
      required: 'This field is required',
      'invalid-email': 'Invalid email format, please try another.',
      'min-length': 'Minimum length should be {{min}} characters',
      'max-length': 'Maximum length should be {{max}} characters',
    },
  },
  register: {
    title: 'Register',
    'credentials-description': 'Register to create an account.',
    'username-label': 'Username',
    'username-placeholder': 'Username',
    'email-label': 'Email',
    'email-placeholder': 'Email',
    'password-label': 'Password',
    'password-placeholder': 'Password',
    'confirm-password-label': 'Confirm Password',
    'confirm-password-placeholder': 'Confirm Password',
    'credentials-submit': 'Register',
    'existing-account-message': 'Already have an account?',
    'login-link': 'Login',
    'register-success': 'Registered successfully.',
    'parse-errors': {
      required: 'This field is required',
      'invalid-email': 'Invalid email format',
      'username-taken': 'Username is already taken, please try another.',
      'min-length': 'Minimum length should be {{min}} characters',
      'max-length': 'Maximum length should be {{max}} characters',
      'password-mismatch': 'Passwords do not match',
    },
  },
  course: {
    navbar: {
      introduction: 'Introduction',
      agenda: 'Agenda',
      tasks: 'Tasks',
      documentation: 'Documentation',
      resources: 'Resources',
    },
    tasks: {
      title: 'Tasks',
      'mark-as-done': 'Mark as done',
      'reverse-status': 'Reverse status',
      'mark-as-done-success': 'Task marked as done',
      'reverse-status-success': 'Status reversed successfully',
      'mark-as-done-error': 'Error marking task as done',
      'reverse-status-error': 'Error reversing status',
      workPhase: {
        individual: 'Individual',
        pair: 'Pair',
        group: 'Group',
        plenum: 'Plenum',
      },
    },
    documentation: {
      title: 'Documentation',
      navbar: {
        close: 'Close',
      },
      next: 'Next',
      previous: 'Previous',
    },
    resources: {
      title: 'Resources',
      'last-modified': 'Last modified',
      name: 'Name',
    },
  },
  authService: {
    'login-success': 'Logged in successfully.',
    'register-success': 'Registered successfully.',
    'unexpected-error': 'An unexpected error occurred, please try again.',
    'email-already-in-use': 'This email is already in use, please try another.',
    'weak-password':
      'The password is too weak, please try a stronger password.',
    'user-disabled':
      'This user has been disabled. Please contact support for more information.',
    'incorrect-email-password':
      'Incorrect email or password, please try again.',
    'too-many-requests': 'Too many requests. Please try again later.',
    'invalid-credential': 'Invalid credentials. Please try again.',
  },
  courseStateService: {
    'course-not-found': 'Course with that ID was not found.',
  },
  fileDownloadService: {
    'error-download-file': 'Error downloading file',
  },
  languageService: {
    'language-change-success': 'Language changed successfully',
    'language-change-error': 'Error changing language',
  },
  authGuard: {
    'must-be-verified-user': 'You must be a verified user to access this page.',
    'must-be-logged-in': 'You must be logged in to access this page.',
  },
  loginGuard: {
    'not-verified': 'Not yet verified.',
  },
  relativeTimePipe: {
    'just-now': 'Just now',
    'minute-ago': '1 minute ago',
    'minutes-ago': '{{ minutes }} minutes ago',
    'hour-ago': '1 hour ago',
    'hours-ago': '{{ hours }} hours ago',
    'day-ago': '1 day ago',
    'days-ago': '{{ days }} days ago',
    'month-ago': '1 month ago',
    'months-ago': '{{ months }} months ago',
    'year-ago': '1 year ago',
    'years-ago': '{{ years }} years ago',
    months: {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December',
    },
  },
};
