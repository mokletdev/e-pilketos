import client from "@/lib/prisma";

export const getAllVoteSession = async () => {
  try {
    const voteSession = await client.vote_session.findMany();
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return [];
  }
};

export const getVoteSessionById = async (id: string) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: { id },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const createVoteSession = async (data: {
    name: string;
    start_time: Date;
    end_time: Date;
    isPublic: boolean;
    max_vote: number;
  }) => {
    try {
      const voteSession = await client.vote_session.create({
        data: {
          title: data.name,
          openedAt: data.start_time,
          closeAt: data.end_time,
          isPublic: data.isPublic,
          max_vote: data.max_vote,
        },
      });
      return voteSession;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  };

  export const upsertVoteSession = async (id: string | undefined, formData: FormData) => {
    try {
      const name = formData.get('name') as string;
      const start_time = new Date(formData.get('start_time') as string);
      const end_time = new Date(formData.get('end_time') as string);
      const is_active = formData.get('is_active') === 'true';
      const max_vote = parseInt(formData.get('max_vote') as string, 10) || 1000;
  
      if (id) {
        const updatedVoteSession = await client.vote_session.update({
          where: { id },
          data: {
            title: name,
            openedAt: start_time,
            closeAt: end_time,
            isPublic: is_active,
            max_vote: max_vote,
          },
        });
        return { error: false, message: 'Vote session updated successfully', data: updatedVoteSession };
      } else {
        const newVoteSession = await client.vote_session.create({
          data: {
            title: name,
            openedAt: start_time,
            closeAt: end_time,
            isPublic: is_active,
            max_vote: max_vote,
          },
        });
        return { error: false, message: 'Vote session created successfully', data: newVoteSession };
      }
    } catch (error) {
      console.error((error as Error).message);
      return { error: true, message: 'An error occurred while upserting the vote session' };
    }
  };

  export const deleteVoteSessionById = async (id: string) => {
    try {
      await client.vote_session.delete({ where: { id } });
      return { error: false, message: 'Vote session deleted successfully' };
    } catch (error) {
      console.error((error as Error).message);
      return { error: true, message: 'An error occurred while deleting the vote session' };
    }
  };

  export const updatedVoteSessionbyId = async (id: string, data: {
    name: string;
    start_time: Date;
    end_time: Date;
    isPublic: boolean;
    max_vote: number;
  }) => {
    try {
      const voteSession = await client.vote_session.update({
        where: { id },
        data: {
          title: data.name,
          openedAt: data.start_time,
          closeAt: data.end_time,
          isPublic: data.isPublic,
          max_vote: data.max_vote,
        },
      });
      return voteSession;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }
  
