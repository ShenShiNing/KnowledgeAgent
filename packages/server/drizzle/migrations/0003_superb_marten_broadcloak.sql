CREATE TABLE `user_model_configs` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`model_id` varchar(36) NOT NULL,
	`api_key` varchar(500),
	`api_endpoint` varchar(500),
	`temperature` int NOT NULL DEFAULT 70,
	`max_tokens` int,
	`top_p` int NOT NULL DEFAULT 100,
	`top_k` int,
	`frequency_penalty` int NOT NULL DEFAULT 0,
	`presence_penalty` int NOT NULL DEFAULT 0,
	`priority` int NOT NULL DEFAULT 0,
	`is_default` boolean NOT NULL DEFAULT false,
	`daily_limit` int,
	`monthly_limit` int,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `user_model_configs_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_model_deleted_idx` UNIQUE(`user_id`,`model_id`,`deleted_at`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`color` varchar(7),
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_created_by_deleted_idx` UNIQUE(`name`,`created_by`,`deleted_at`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_bases` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `knowledge_bases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_base_permissions` (
	`id` varchar(36) NOT NULL,
	`knowledge_base_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`permission` enum('read','write','admin') NOT NULL,
	`shared_by` varchar(36) NOT NULL,
	`expires_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `knowledge_base_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `kb_user_deleted_idx` UNIQUE(`knowledge_base_id`,`user_id`,`deleted_at`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` varchar(36) NOT NULL,
	`knowledge_base_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`file_type` varchar(50) NOT NULL,
	`file_size` int NOT NULL,
	`storage_path` varchar(500) NOT NULL,
	`processing_status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
	`chunk_count` int NOT NULL DEFAULT 0,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `document_chunks` (
	`id` varchar(36) NOT NULL,
	`document_id` varchar(36) NOT NULL,
	`chunk_index` int NOT NULL,
	`content` text NOT NULL,
	`embedding` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `document_chunks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `document_tags` (
	`id` varchar(36) NOT NULL,
	`document_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `document_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `document_tag_idx` UNIQUE(`document_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `document_versions` (
	`id` varchar(36) NOT NULL,
	`document_id` varchar(36) NOT NULL,
	`version_number` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`content_hash` varchar(64) NOT NULL,
	`storage_path` varchar(500) NOT NULL,
	`file_size` int NOT NULL,
	`change_reason` varchar(500),
	`chunk_count` int NOT NULL DEFAULT 0,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `document_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_providers` (
	`id` varchar(36) NOT NULL,
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`logo_url` varchar(500),
	`base_url` varchar(500),
	`default_model` varchar(100),
	`status` enum('active','inactive','deprecated') NOT NULL DEFAULT 'active',
	`created_by` varchar(36),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `ai_providers_id` PRIMARY KEY(`id`),
	CONSTRAINT `ai_providers_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `ai_models` (
	`id` varchar(36) NOT NULL,
	`provider_id` varchar(36) NOT NULL,
	`model_id` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`model_type` enum('chat','completion','embedding') NOT NULL DEFAULT 'chat',
	`supports_rag` boolean NOT NULL DEFAULT true,
	`supports_tools` boolean NOT NULL DEFAULT false,
	`supports_images` boolean NOT NULL DEFAULT false,
	`max_tokens` int NOT NULL DEFAULT 4096,
	`context_window` int NOT NULL DEFAULT 4096,
	`input_price` int NOT NULL DEFAULT 0,
	`output_price` int NOT NULL DEFAULT 0,
	`status` enum('active','inactive','beta') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_models_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_usage_stats` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`model_id` varchar(36) NOT NULL,
	`conversation_id` varchar(36),
	`request_type` enum('chat','completion','embedding') NOT NULL,
	`prompt_tokens` int NOT NULL DEFAULT 0,
	`completion_tokens` int NOT NULL DEFAULT 0,
	`total_tokens` int NOT NULL DEFAULT 0,
	`estimated_cost` int NOT NULL DEFAULT 0,
	`response_time` int,
	`status` enum('success','failed','partial') NOT NULL DEFAULT 'success',
	`error_code` varchar(50),
	`error_message` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_usage_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` varchar(36) NOT NULL,
	`code` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`role_type` enum('system','custom') NOT NULL DEFAULT 'custom',
	`level` enum('admin','moderator','user','guest') NOT NULL DEFAULT 'user',
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_by` varchar(36),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` varchar(36) NOT NULL,
	`code` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`category` enum('document','knowledge_base','chat','user','system','ai') NOT NULL,
	`permission_type` enum('read','write','delete','manage') NOT NULL,
	`resource` varchar(100) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` varchar(36) NOT NULL,
	`role_id` varchar(36) NOT NULL,
	`permission_id` varchar(36) NOT NULL,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `role_permission_idx` UNIQUE(`role_id`,`permission_id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role_id` varchar(36) NOT NULL,
	`assigned_by` varchar(36) NOT NULL,
	`assigned_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp,
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_settings` (
	`id` varchar(36) NOT NULL,
	`key` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`value` json,
	`value_type` enum('string','number','boolean','json','array') NOT NULL,
	`category` enum('general','upload','ai','security','limits','ui') NOT NULL,
	`is_system` varchar(1) NOT NULL DEFAULT '1',
	`is_public` varchar(1) NOT NULL DEFAULT '0',
	`validation_rules` json,
	`created_by` varchar(36),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` varchar(36),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_by` varchar(36),
	`deleted_at` timestamp,
	CONSTRAINT `system_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `system_settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
ALTER TABLE `conversations` ADD `knowledge_base_id` varchar(36);--> statement-breakpoint
ALTER TABLE `messages` ADD `sources` json;--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_model_configs` (`user_id`);--> statement-breakpoint
CREATE INDEX `model_id_idx` ON `user_model_configs` (`model_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `user_model_configs` (`status`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `user_model_configs` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `tags` (`created_by`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `tags` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `knowledge_bases` (`created_by`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `knowledge_bases` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `knowledge_base_id_idx` ON `knowledge_base_permissions` (`knowledge_base_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `knowledge_base_permissions` (`user_id`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `knowledge_base_permissions` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `knowledge_base_id_idx` ON `documents` (`knowledge_base_id`);--> statement-breakpoint
CREATE INDEX `processing_status_idx` ON `documents` (`processing_status`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `documents` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `document_id_idx` ON `document_chunks` (`document_id`);--> statement-breakpoint
CREATE INDEX `document_id_idx` ON `document_versions` (`document_id`);--> statement-breakpoint
CREATE INDEX `version_number_idx` ON `document_versions` (`version_number`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `document_versions` (`created_at`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `ai_providers` (`status`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `ai_providers` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `provider_id_idx` ON `ai_models` (`provider_id`);--> statement-breakpoint
CREATE INDEX `model_type_idx` ON `ai_models` (`model_type`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `ai_models` (`status`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `ai_usage_stats` (`user_id`);--> statement-breakpoint
CREATE INDEX `model_id_idx` ON `ai_usage_stats` (`model_id`);--> statement-breakpoint
CREATE INDEX `conversation_id_idx` ON `ai_usage_stats` (`conversation_id`);--> statement-breakpoint
CREATE INDEX `request_type_idx` ON `ai_usage_stats` (`request_type`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `ai_usage_stats` (`created_at`);--> statement-breakpoint
CREATE INDEX `role_type_idx` ON `roles` (`role_type`);--> statement-breakpoint
CREATE INDEX `level_idx` ON `roles` (`level`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `roles` (`status`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `roles` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `permissions` (`category`);--> statement-breakpoint
CREATE INDEX `permission_type_idx` ON `permissions` (`permission_type`);--> statement-breakpoint
CREATE INDEX `resource_idx` ON `permissions` (`resource`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `permissions` (`status`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `permissions` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `role_permissions` (`role_id`);--> statement-breakpoint
CREATE INDEX `permission_id_idx` ON `role_permissions` (`permission_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_roles` (`user_id`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `user_roles` (`role_id`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `system_settings` (`category`);--> statement-breakpoint
CREATE INDEX `is_system_idx` ON `system_settings` (`is_system`);--> statement-breakpoint
CREATE INDEX `is_public_idx` ON `system_settings` (`is_public`);--> statement-breakpoint
CREATE INDEX `deleted_at_idx` ON `system_settings` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `knowledge_base_id_idx` ON `conversations` (`knowledge_base_id`);