import React, { useState, useEffect } from 'react';
import Pickup from './pickup'; // ต้องแก้ไข path ให้ตรงกับที่อยู่ของ MaterialAdd จริง ๆ

interface Material {
    id: string;
    name: string;
    // ... ข้อมูลอื่น ๆ จากโค้ดที่ 1
}

function PickupComponent() {
    const [selectedMaterial, setSelectedMaterial] = useState<string>('');
    const [materialData, setMaterialData] = useState<any>(null);

    const materialDataFromCode1: Material[] = [
        {
            id: '1',
            name: 'เหล็กเส้น',
            // ... ข้อมูลอื่น ๆ จากโค้ดที่ 1
        },
        {
            id: '2',
            name: 'วัสดุสำเร็จรูป',
            // ... ข้อมูลอื่น ๆ จากโค้ดที่ 1
        },
        // เพิ่มข้อมูล Material อื่น ๆ จากโค้ดที่ 1
    ];

    const handleMaterialChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string;
        setSelectedMaterial(selectedValue);
    };

    useEffect(() => {
        if (selectedMaterial) {
            const selectedMaterialData = materialDataFromCode1.find(
                (material) => material.name === selectedMaterial
            );
            setMaterialData(selectedMaterialData);
        } else {
            setMaterialData(null);
        }
    }, [selectedMaterial]);

    return (
        <>
            {/* ...other components */}

            <Pickup
                materialName={selectedMaterial}
                onMaterialChange={handleMaterialChange}
                materialData={materialData}
            />

            {/* ...other components */}
        </>
    );
}

export default PickupComponent;