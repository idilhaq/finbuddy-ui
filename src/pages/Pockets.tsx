import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

type Pocket = {
    id: number;
    name: string;
    balance: number;
};

const initialPockets: Pocket[] = [
    { id: 1, name: 'Travel Fund', balance: 500 },
    { id: 2, name: 'Emergency', balance: 1200 },
];

const Pockets: React.FC = () => {
    const [pockets, setPockets] = useState<Pocket[]>(initialPockets);
    const [showForm, setShowForm] = useState(false);
    const [editingPocket, setEditingPocket] = useState<Pocket | null>(null);
    const [form, setForm] = useState({ name: '', balance: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = () => {
        setEditingPocket(null);
        setForm({ name: '', balance: '' });
        setShowForm(true);
    };

    const handleEdit = (pocket: Pocket) => {
        setEditingPocket(pocket);
        setForm({ name: pocket.name, balance: pocket.balance.toString() });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setPockets(pockets.filter(p => p.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || isNaN(Number(form.balance))) return;

        if (editingPocket) {
            setPockets(pockets.map(p =>
                p.id === editingPocket.id
                    ? { ...p, name: form.name, balance: Number(form.balance) }
                    : p
            ));
        } else {
            setPockets([
                ...pockets,
                {
                    id: Date.now(),
                    name: form.name,
                    balance: Number(form.balance),
                },
            ]);
        }
        setShowForm(false);
        setEditingPocket(null);
        setForm({ name: '', balance: '' });
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Pockets</h1>
            <Button onClick={handleCreate} className="mb-4">
                + Create Pocket
            </Button>
            <div className="flex flex-wrap gap-4">
                {pockets.map(pocket => (
                    <Card key={pocket.id} className="w-56">
                        <CardHeader>
                            <CardTitle>{pocket.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2">Balance: ${pocket.balance}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(pocket)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(pocket.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>
                                {editingPocket ? 'Edit Pocket' : 'Create Pocket'}
                            </DialogTitle>
                        </DialogHeader>
                        <Input
                            name="name"
                            placeholder="Pocket Name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            name="balance"
                            placeholder="Balance"
                            type="number"
                            value={form.balance}
                            onChange={handleInputChange}
                            required
                            min={0}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {editingPocket ? 'Update' : 'Create'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Pockets;
