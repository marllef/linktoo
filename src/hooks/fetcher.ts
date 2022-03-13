import useSWR from "swr";
import { useAuth } from "./useAuth";
import { Link, User } from "@prisma/client";

export const useLinks = () => {
  const { user } = useAuth();

  const { data, error, isValidating } = useSWR(
    user?.email ? `/api/database/users/${user.email}` : null,
    async (...args) => {
      const response = await fetch(...args);
      const { links }: { links: Link[] } = await response.json();
      return links;
    },
    {
      refreshInterval: 7000,
    }
  );

  return {
    links: data!,
    error,
    isValidating,
  };
};

export const useUsers = () => {
  const { data, error, isValidating } = useSWR(
    `/api/auth/`,
    async (...args) => {
      const response = await fetch(...args);
      const users: User[] = await response.json();
      return users;
    },
    {
      refreshInterval: 5000,
    }
  );

  return {
    users: data!,
    error,
    isValidating,
  };
};

export const createLink = async (data: Link, user: any) => {
  const response = await fetch("/api/database/links", {
    method: "POST",
    body: JSON.stringify({
      ...user,
      ...data,
    }),
  });

  const createdLink: Link = await response.json();

  return createdLink;
};

export const deleteLink = async (id: string) => {
  const response = await fetch(`/api/database/links/${id}`, {
    method: "DELETE",
  });
  const data: Link = await response.json();
  return data;
};

export const updateLink = async (id: string, changes: any) => {
  const response = await fetch(`/api/database/links/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...changes,
    }),
  });
  const data: Link = await response.json();
  return data;
};

export const getLinksByUsername = async (username: string) => {
  await fetch("/api/database/users", {
    method: "POST",
    body: JSON.stringify({
      username,
    }),
  });
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`/api/auth/${email}`);
    const data: User = await response.json();
    return data;
  } catch (err: any) {
    console.log(err.message);
  }
};
