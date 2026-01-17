ALTER TABLE `users` DROP INDEX `users_email_unique`;--> statement-breakpoint
DROP INDEX `email_idx` ON `users`;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `email_deleted_idx` UNIQUE(`email`,`deleted_at`);