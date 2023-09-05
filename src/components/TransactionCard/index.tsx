import Image from "next/image";

interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: string;
    type: string;
    user_id?: string;
    bowl_id?: string;
    image: string;
}

interface TransactionCardProps {
    transaction: Transaction
}

export default function TransactionCard({transaction}: TransactionCardProps) {
    return(
        <li>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.category}</span>
            <span>{transaction.type}</span>
            <span>{transaction.bowl_id}</span>
            <Image
            src={transaction.image}
            alt={transaction.description}
            width={300}
            height={300}
            />
        </li>
    )
}