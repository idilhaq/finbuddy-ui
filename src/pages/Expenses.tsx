import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getUserExpenses, createExpense, updateExpense } from '@/services/expenseService'

interface UserExpenses {
    id: string
    category: string
    amount: number
    note: string
    date: string
    created_at: string
    updated_at: string
}

const emptyExpense = {
    id: '',
    category: '',
    amount: 0,
    note: '',
    date: '',
    created_at: '',
    updated_at: '',
}

function Expenses() {
    const [expenses, setExpenses] = useState<UserExpenses[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [editing, setEditing] = useState<UserExpenses | null>(null)
    const [form, setForm] = useState<UserExpenses>(emptyExpense)

    useEffect(() => {
        fetchExpenses()
    }, [])

    const fetchExpenses = async () => {
        setLoading(true)
        setError(null)
        const result = await getUserExpenses()
        if (result.success) {
            setExpenses(result.data)
        } else {
            setError(result.error)
        }
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    const handleEdit = (expense: UserExpenses) => {
        setEditing(expense)
        setForm(expense)
    }

    const handleCancel = () => {
        setEditing(null)
        setForm(emptyExpense)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        // Force amount to number before sending
        const formToSend = { ...form, amount: Number(form.amount) }
        if (editing) {
            const result = await updateExpense(formToSend)
            if (result.success) {
                fetchExpenses()
                setEditing(null)
                setForm(emptyExpense)
            } else {
                setError(result.error)
            }
        } else {
            const result = await createExpense(formToSend)
            if (result.success) {
                fetchExpenses()
                setForm(emptyExpense)
            } else {
                setError(result.error)
            }
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Expenses</h2>
            <Card className="mb-6 max-w-xl">
                <CardHeader>
                    <CardTitle>{editing ? 'Edit Expense' : 'Add Expense'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                        <Input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
                        <Input name="note" placeholder="Note" value={form.note} onChange={handleChange} />
                        <Input
                            name="date"
                            type="date"
                            placeholder="Date"
                            value={form.date ? form.date.slice(0, 10) : ''}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex gap-2">
                            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
                            {editing && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </form>
                </CardContent>
            </Card>
            <Table>
                <TableCaption>Your expenses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>{expense.note}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell>
                                <Button size="sm" variant="outline" onClick={() => handleEdit(expense)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell>{expenses.reduce((sum, e) => sum + Number(e.amount), 0)}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default Expenses
