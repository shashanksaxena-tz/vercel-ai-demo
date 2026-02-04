'use client';

import React from 'react';
import { registries, RegistryKey } from '@/registries';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface RegistrySwitcherProps {
    value: RegistryKey;
    onChange: (value: RegistryKey) => void;
}

export function RegistrySwitcher({ value, onChange }: RegistrySwitcherProps) {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
                UI Library:
            </label>
            <Select value={value} onValueChange={(v) => onChange(v as RegistryKey)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select library" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(registries).map(([key, lib]) => (
                        <SelectItem key={key} value={key}>
                            {lib.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
