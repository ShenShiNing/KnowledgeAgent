ALTER TABLE `users` MODIFY COLUMN `username` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `status` enum('active','inactive','banned') DEFAULT 'inactive' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `username_deleted_idx` UNIQUE(`username`,`deleted_at`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `users` (`status`);