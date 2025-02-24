-- DropForeignKey
ALTER TABLE `PriceChange` DROP FOREIGN KEY `PriceChange_productId_fkey`;

-- DropForeignKey
ALTER TABLE `StockChange` DROP FOREIGN KEY `StockChange_productId_fkey`;

-- DropIndex
DROP INDEX `PriceChange_productId_fkey` ON `PriceChange`;

-- DropIndex
DROP INDEX `StockChange_productId_fkey` ON `StockChange`;

-- AddForeignKey
ALTER TABLE `PriceChange` ADD CONSTRAINT `PriceChange_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockChange` ADD CONSTRAINT `StockChange_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
