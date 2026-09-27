CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`pickup` text NOT NULL,
	`destination` text NOT NULL,
	`pickup_date` text NOT NULL,
	`return_date` text,
	`passengers` text NOT NULL,
	`vehicle` text,
	`message` text,
	`created_at` text NOT NULL
);
