/*
  Warnings:

  - You are about to alter the column `vehicleType` on the `traffic_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `city` to the `traffic_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `traffic_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `traffic_data` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    MODIFY `vehicleType` ENUM('CAR', 'TRUCK', 'BUS', 'MOTORCYCLE', 'BICYCLE', 'VAN', 'SUV') NOT NULL;

-- CreateIndex
CREATE INDEX `traffic_data_country_idx` ON `traffic_data`(`country`);

-- CreateIndex
CREATE INDEX `traffic_data_vehicleType_idx` ON `traffic_data`(`vehicleType`);
