-- CreateTable
CREATE TABLE "Addproperty" (
    "id" TEXT NOT NULL,
    "image2" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Addproperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addproperty" ADD CONSTRAINT "Addproperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
